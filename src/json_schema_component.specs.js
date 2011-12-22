
var fixture;

beforeEach(function () {
  fixture = $("#fixture");
  fixture.empty();
});

describe("JsonSchemaComponent", function() {

  describe('form-in features', function() {

    it("should throw an error when invoked w/o arguments", function() {
      try {
        new JsonSchemaComponent();
      } catch (error) {
        expect(error.message).toEqual(
          "JsonSchemaComponent needs arguments, like this: 'new JsonSchemaComponent({...);'.");
      }
    });

    it("should throw an error when invoked w/o schema", function() {
      try {
        new JsonSchemaComponent({textarea:"bar"});
      } catch (error) {
        expect(error.message).toEqual(
          "JsonSchemaComponent needs a schema, like this: 'new JsonSchemaComponent({schema:{...});'.");
      }
    });

    it("should throw an error when invoked w/o textarea", function() {
      try {
        new JsonSchemaComponent({schema:{}});
      } catch (error) {
        expect(error.message).toEqual(
          "JsonSchemaComponent needs a textarea, like this: 'new JsonSchemaComponent({textarea:'#...');'.");
      }
    });

    it("should should fill values in a simple provided form with one text field", function() {
      fixture.html('<textarea id=testtextarea>{"field_a":"value_a"}</textarea>'+
                   '<form id=testform><input type=text id="testtextfield" name=field_a /></form>');

      new JsonSchemaComponent({schema:{}, textarea:"#testtextarea", form:"#testform"});

      expect($("#testtextfield").val()).toEqual("value_a");
    });

    it("should should fill boolean values in a provided form with two checkboxes", function() {
      fixture.html('<textarea id=testtextarea>{"field_a": true, "field_b": false}</textarea>'+
                   '<form id=testform>'+
                   '<input type=checkbox id="testcheckbox_a" name=field_a />'+
                   '<input type=checkbox id="testcheckbox_b" name=field_b />'+
                   '</form>');

      new JsonSchemaComponent({schema:{}, textarea:"#testtextarea", form:"#testform"});

      expect($("#testcheckbox_a").is(":checked")).toBeTruthy();
      expect($("#testcheckbox_b").is(":checked")).toBeFalsy();
    });

    it("should should fill boolean values in a provided form with two radio boxes", function() {
      fixture.html('<textarea id=testtextarea>{"field": ["b"]}</textarea>'+
                   '<form id=testform>'+
                   '<input type=radio id="testradiobox_a" name=field value="a" />'+
                   '<input type=radio id="testradiobox_b" name=field value="b" />'+
                   '</form>');

      new JsonSchemaComponent({schema:{}, textarea:"#testtextarea", form:"#testform"});

      expect($("#testradiobox_a").is(":checked")).toBeFalsy();
      expect($("#testradiobox_b").is(":checked")).toBeTruthy();
    });
  });

  describe('form-out features', function() {
    beforeEach(function () {
      fixture.html(
      );
    });

    it("should should update the textarea's json from a simple textfield change", function() {
      fixture.html(
        '<textarea id=testtextarea>{      "title": "Moby Dick"}</textarea>' +
        '<form id=testform>'+
        '<input type=text id=testtext name=title value="" />'+
        '</form>'
      );

      new JsonSchemaComponent({schema:{}, textarea:"#testtextarea", form:"#testform"});

      $('#testtext').val("Captain Ahab");
      $('#testtext').trigger("change");

      expect($("#testtextarea").val()).toContain('"title": "Captain Ahab"');

    });

    it("should should update the textarea's json from a simple textarea change", function() {

      fixture.html(
        '<textarea id=testtextarea>{      "abstract": "Something about a white whale and a man.."}</textarea>' +
        '<form id=testform>'+
        '<textarea id=testtext name=abstract value="" />'+
        '</form>'
      );

      new JsonSchemaComponent({schema:{}, textarea:"#testtextarea", form:"#testform"});

      $('#testtext').val("A story about a man and his whale");
      $('#testtext').trigger("change");

      expect($("#testtextarea").val()).toContain('"abstract": "A story about a man and his whale"');

    });

    it("should should update the textarea's json from a simple checkbox change", function() {

      fixture.html(
        '<textarea id=testtextarea>{      "public": false}</textarea>' +
        '<form id=testform>' +
        '<input type=checkbox id=testcheckbox name=public>' +
        '</form>'
      );

      new JsonSchemaComponent({schema:{}, textarea:"#testtextarea", form:"#testform"});

      $('#testcheckbox').click();

      expect($("#testtextarea").val()).toContain('"public": true');

    });

    it("should should update the textarea's json from a radio box", function() {

      fixture.html(
        '<textarea id=testtextarea>{      "category": "politics"}</textarea>'+
        '<form id=testform>' +
          '<input type="radio" id=l value=local name=category>' +
          '<input type="radio" id=f value=filmcritics name=category checked=checked>' +
          '<input type="radio" id=p value=politics name=category>' +
        '</form>'
      );

      new JsonSchemaComponent({schema:{}, textarea:"#testtextarea", form:"#testform"});

      $('#l').click();

      expect($("#testtextarea").val()).toContain('"category": "local"');
    });
  });
});

