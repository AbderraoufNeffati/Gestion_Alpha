import ClassModelGenerated from "./generated/ClassModelGenerated";

const customModel = {
  
  /**
   * Customize here your schema with custom attributes
   * 
   * EXAMPLE:
    
    init() {
      let schema = ClassModelGenerated.init();
  
      schema.add({
        extraCustomField: Object
      });
    },
     
   */


  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await ClassModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...ClassModelGenerated,
  ...customModel
};
