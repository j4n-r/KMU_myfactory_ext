const LOGIN =
  "https://myfactory.privatecloud.mobi/HWR/ie50/system/login/sysloginbackground.aspx?login=start&apptype=-3";
function login() {
  document.getElementById("login").addEventListener("click", () => {
    chrome.tabs.create({ url: LOGIN });
  });
}
