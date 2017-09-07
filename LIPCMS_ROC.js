

var strWindowFeatures = "toolbar=no,menubar=no,location=no,resizable=no,scrollbars=no,status=no";

var openWindows = []

var createScreen = function(screenLeft, screenTop, screenHeight, screenWidth)
{
  return {
    left: screenLeft,
    top: screenTop,
    height: screenHeight,
    width: screenWidth,
  }
}

var allScreens = [
  createScreen(0,    0, 760, 1024),
  /*createScreen(0,    0, 1080, 1920),
  createScreen(1920, 0, 1080, 1920),*/
]

function openWindow(name, url, screen=0)
{
  var windowFeatures = strWindowFeatures;
  windowFeatures += ",left="+allScreens[screen].left.toString();
  windowFeatures += ",top="+allScreens[screen].top.toString();
  windowFeatures += ",outerHeight="+allScreens[screen].height.toString();
  windowFeatures += ",outerWidth="+allScreens[screen].width.toString();

  var winRef = window.open(url, name, windowFeatures);

  openWindows.push(winRef);
}

var createPage = function(pageURL, pageName, screen=0)
{
  return {
      URL: pageURL,
      name: pageName,
      openMe: function(){
        openWindow(pageName, pageURL, screen);
      }
  }
}

var allPages = {
  mylhcPage1: createPage("Pages/LHCStatus.html", "LHC Page 1"),
  cmsPage0: createPage("https://cmswbm.cern.ch/cmsdb/servlet/PageZero", "CMS Page Zero"),
  cmsPage1: createPage("http://cmspage1.web.cern.ch/cmspage1/", "CMS Page 1"),
  //mycmsPage1: createPage("Pages/CMSStatus.html", "CMS Page 1"),
}

var closeOpenedWindows = function()
{
  var failed = []
  for(i = 0; i < openWindows.length; i++)
  {
    openWindows[i].close();
    if(!openWindows[i].closed)
      failed.push(openWindows[i]);
  }
  openWindows = failed
}

var closeButton = document.getElementById('closeButton');
if (closeButton)
{
  closeButton.onclick = closeOpenedWindows;
}

var pageHolder = document.getElementById('pageHolder');
if (pageHolder)
{
  for(var key in allPages)
  {
    var newButton = document.createElement('button');
    newButton.type = "button";
    newButton.onclick = allPages[key].openMe

    var text = document.createTextNode(allPages[key].name);
    newButton.appendChild(text);

    pageHolder.appendChild(newButton);
  }
}
