import { address } from "faker/lib/locales/az";
import commonPage from "./common.page";

class ProductPage{

    // get category(){
    //      return $(".sf-with-ul[title='Women']");
    // }

    get btnSubcategory(){
        return $$(".subcategory-name");
    }

    get txtProductTitle(){
        return $$(".right-block .product-name");
    }
   
    get inputQuantity(){
        return $("#quantity_wanted");
    }

    get btnAddToCart(){
        return $("#add_to_cart button");
    }
     
    get btnAddToCart(){
        return $("#add_to_cart button");
    }

    get btnContinueShopping(){
        return $(".continue > span");
    }
    
    get textModel() {
        return $("#product_reference .editable");
      }
    
      get btnShoppingCart() {
        return $(".shopping_cart");
      }
    
      get listShoppingCartItems() {
        return $$(".cart_block_list .products dt");
      }
    
      get btnCartCheckout() {
        return $(".cart_block_list .cart-buttons a");
      }
    
      get listSummaryTableRow() {
        return $$("#cart_summary tbody tr");
      }
    
      get btnContinueCheckoutSummary() {
        return $(".cart_navigation.clearfix a.standard-checkout");
      }
      get btnContinueCheckout() {
        return $(".cart_navigation.clearfix button");
      }
    
      get txt_DeliveryAddressFirstNameLastName() {
        return $("#address_delivery li.address_firstname.address_lastname");
      }
    
      get txt_DeliveryAddressCompany() {
        return $("#address_delivery li.address_company");
      }
    
      get txt_DeliveryAdd_Add1_Add2() {
        return $("#address_delivery li.address_address1.address_address2");
      }
    
      get txt_ErrorModal() {
        return $(".fancybox-error");
      }
    
      get btnCloseModalError() {
        return $(".fancybox-item.fancybox-close");
      }
    
      get linkCheck() {
        return $(".cheque");
      }
    
      get linkBankTransfer() {
        return $("#HOOK_PAYMENT div div p.payment_module a.bankwire");
      }
    
      get alertPaymentSuccess() {
        return $(".alert.alert-success");
      }


    // actions
    addProducts =async (table) =>{

        const tableRow=table.hashes();

        for(const element of table){
            const btnCategory =  $(`//div[@id='block_top_menu']/ul/li/a[contains(text(),'${element.category}')]`);
            await btnCategory.click();

            //Subcategory
            this.btnSubcategory.forEach(async (value)=>{

                const subCat= await value.getText();
                if(subCat===element.subCategory){
                    await value.click();
                    return;
                }
            });

            //select product
            this.txtProductTitle.forEach(async(value)=>{

                const productName = await value.getText();
                 
                if(productName==element.name){
                    await value.click();
                    return;
                }
            });

            // enter quantity
            await this.inputQuantity.setValue(element.quantity);

            // verify info in Modal
            expect(await this.textModel.getText()).toEqual(element.model);

            // click add to cart button
            await this.btnContinueShopping.waitForclickable({timeout:10000 });
            await this.btnContinueShopping.click();





        }
     
    
    
    };  

    verifyShoppingCart = async (table) => {
      await this.btnShoppingCart.moveTo();
      expect(await this.listShoppingCartItems.length).toEqual(2);
  
      await browser.navigateTo(
        "http://automationpractice.com/index.php?controller=order"
      );
  
      const headingTitle = $(".page-heading");
  
      await headingTitle.waitForExist({ timeout: 5000 });
  
      await expect(await (await headingTitle.getText()).trim()).toContain(
        "SHOPPING-CART SUMMARY"
      );
  
      const tableRows = table.hashes();
      for (const element of tableRows) {
        console.log(element.name);
        console.log(element.model);
        console.log(element.quantity);
  
        // Validate Summary Table
        await this.listSummaryTableRow
          .filter(
            async (e) =>
              (await (await e.$("td.cart_description p")).getText()) ===
              element.name
          )
          .forEach(async (ele) => {
            console.log("Inside for after filter");
  
            const name = await (await ele.$("td.cart_description p")).getText();
  
            const model = await (await ele.$(".cart_ref")).getText();
  
            const quantity = await (
              await ele.$(".cart_quantity .cart_quantity_input.form-control.grey")
            ).getValue();
  
            await expect(name).toEqual(element.name);
            await expect(model).toEqual(element.model);
            await expect(quantity).toEqual(element.quantity);
          });
      }
    };

    buyProduct =async ()=>{
       await this.btnContinueCheckoutSummary.click();

       await commonPage.vaerifyPageHeading("ADDRESSES");

      //address validation
      
      await expect(

        await this.txt_DeliveryAddressFirstNameLastName.getText()
      ).toEqual(
        global.SharedVariable.address.firstName +
        " " + 
          global.SharedVariable.address.lastName
      );

      await expect( await this.txt_DeliveryAddressCompany.getText()).toEqual(
        global.SharedVariable.address.company
      );
       
      await expect(

        await this.txt_DeliveryAdd_Add1_Add2.getText()
      ).toEqual(
        global.SharedVariable.address.address1 +
        " " + 
          global.SharedVariable.address.address2
      );

      // navigate to shipping page

      await this.btnContinueCheckout.click();
      await commonPage.vaerifyPageHeading("SHIPPING");

      // validate pop up when not checked for Terns and Services
      await this.btnContinueCheckout.click();

      await expect(await this.txt_ErrorModal.isDisplayed()).toBeTruthy();

      await expect(await this.txt_ErrorModal.getText()).toEqual(
        "You must agree to the terms of service before continuting."
      );
      
      //close modal
      await this. btnCloseModalError.click();

      // clicl terms $ condition checkbox
      await $("#cgv").click();

      await this.btnContinueCheckout.click();

      await commonPage.vaerifyPageHeading("PLEASE CHOOSE YOUR PAYMENT METHOD");
      
      await this.linkCheck.click();

      await commonPage.vaerifyPageHeading("ORDER SUMMARY");

      await this.btnContinueCheckout.click();

      await expect(await this.alertPaymentSuccess.isDisplayed()).toBeTruthy();

      

    };
    
}
export default new ProductPage();