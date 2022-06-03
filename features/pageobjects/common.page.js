class commonPage {
    openHomePage() {
      browser.url("http://automationpractice.com/index.php");
      console.log("Navigating to Url 'http://automationpractice.com/index.php'");
    }
  
    
  }
  export default new commonPage();