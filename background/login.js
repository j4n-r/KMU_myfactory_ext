document.getElementById("login").addEventListener("click", () => {
  console.log("createt ab");
  chrome.tabs.create({
    url: "https://myfactory.privatecloud.mobi/HWR/ie50/system/login/sysloginbackground.aspx?login=start&apptype=-3.url",
  });
});
