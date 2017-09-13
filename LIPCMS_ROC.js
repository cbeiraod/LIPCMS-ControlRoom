

var strWindowFeatures = "toolbar=yes,menubar=no,location=no,resizable=no,scrollbars=yes,status=no";

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
  createScreen(0,    0, 1080, 1920),
  createScreen(1920, 0, 1080, 1920),
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

  /*var winRef = window.open("PageDisplay.html", name, windowFeatures);
  openWindows.push(winRef);

  winRef.onload = function()
  {
    var tmp = winRef.document.getElementById('frameDisplay');
    tmp.src = url;
  }*/ // Unfortunately does not work for protected pages
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
  lhcStatus: createPage("https://cmswbm.cern.ch/cmsdb/servlet/LHCStatusDisplay", "LHC Status"),
  magnetHistory: createPage("https://cmswbm.cern.ch/cmsdb/servlet/MagnetHistory", "Magnet History"),
  cmsDaq: createPage("http://cmsdoc.cern.ch/B40tvs/cms_daq.html", "CMS DAQ"),
  onlineDQM: createPage("https://cmsweb.cern.ch/dqm/online", "Online DQM"),
  runtimeSummary: createPage("https://cmswbm.cern.ch/cmsdb/servlet/FillSummary", "Runtime Summary"),
  hltRates: createPage("https://cmswbm.cern.ch/cmsdb/servlet/HLTriggerRates", "HLT Rates"),
  latestStableFill: createPage("https://cmswbm.cern.ch/cmsdb/servlet/FillReport?N=1&BYLASTFILLS=TRUE&STABLE=TRUE", "Latest stable Fill"),
  liveEvents: createPage("http://cmsdoc.cern.ch/cmscc/cmstv/cmstv.jsp?channel=12&frames=no", "Live Events"),
  events2009: createPage("http://cmsdoc.cern.ch/cmscc/cmstv/cmstv.jsp?channel=6&frames=no", "Events 2009"),
  events10_11: createPage("http://cmsdoc.cern.ch/cmscc/cmstv/cmstv.jsp?channel=7&frames=no", "Events 2010-2011"),
  simEvents: createPage("http://cmsdoc.cern.ch/cmscc/cmstv/cmstv.jsp?channel=8&frames=no", "Event Simulations"),
  cosmicMuons: createPage("http://cmsdoc.cern.ch/cmscc/cmstv/cmstv.jsp?channel=5&frames=no", "Cosmic Muons"),
  cmsPhotos: createPage("http://cmsdoc.cern.ch/cmscc/cmstv/cmstv.jsp?channel=9&frames=no", "CMS Photos"),
};

var shiftVisiblePages = {
  topLeft: allPages.mylhcPage1,
  topCentre: allPages.cmsPage0,
  topRight: allPages.cmsPage1,
  midLeft: allPages.lhcStatus,
  midCentre: allPages.magnetHistory,
  midRight: allPages.cmsDaq,
  bottomLeft: allPages.onlineDQM,
  bottomLeftCentre: allPages.runtimeSummary,
  bottomRightCentre: allPages.hltRates,
  bottomRight: allPages.latestStableFill,
};

var publicVisiblePages = {
  topLeft: allPages.mylhcPage1,
  topCentre: allPages.liveEvents,
  topRight: allPages.cmsPage1,
  midLeft: allPages.events2009,
  midCentre: allPages.cmsDaq,
  midRight: allPages.events10_11,
  bottomLeft: allPages.onlineDQM,
  bottomLeftCentre: allPages.simEvents,
  bottomRightCentre: allPages.cmsPhotos,
  bottomRight: allPages.cosmicMuons,
};

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

var choosePage = function(visiblePages)
{
  blockingDiv = document.getElementById('disablingDiv');
  blockingDiv.style.display = 'block';

  var screenSelection = document.createElement('div');
  screenSelection.className = 'screenSelector';

  var thisHeader = document.createElement('header')
  var text = document.createTextNode("You are not running in the Remote Operation Center. Click on the screen that you want to emulate:");
  thisHeader.appendChild(text);
  screenSelection.appendChild(thisHeader);



  var break1 = document.createElement('br');
  screenSelection.appendChild(break1);
  var div1 = document.createElement('div');
  div1.className = "center"
  screenSelection.appendChild(div1);

  var screen1 = document.createElement('div');
  screen1.className = "screen";
  screen1.onclick = function()
  {
    openWindow(visiblePages.topLeft.name, visiblePages.topLeft.URL);
    blockingDiv.removeChild(screenSelection);
    document.getElementById('disablingDiv').style.display='none';
  };
  var text1 = document.createTextNode("1");
  screen1.appendChild(text1);
  div1.appendChild(screen1);

  var screen2 = document.createElement('div');
  screen2.className = "screen";
  screen2.onclick = function()
  {
    openWindow(visiblePages.topCentre.name, visiblePages.topCentre.URL);
    blockingDiv.removeChild(screenSelection);
    document.getElementById('disablingDiv').style.display='none';
  };
  var text2 = document.createTextNode("2");
  screen2.appendChild(text2);
  div1.appendChild(screen2);

  var screen3 = document.createElement('div');
  screen3.className = "screen";
  screen3.onclick = function()
  {
    openWindow(visiblePages.topRight.name, visiblePages.topRight.URL);
    blockingDiv.removeChild(screenSelection);
    document.getElementById('disablingDiv').style.display='none';
  };
  var text3 = document.createTextNode("3");
  screen3.appendChild(text3);
  div1.appendChild(screen3);



  var break2 = document.createElement('br');
  screenSelection.appendChild(break2);
  var div2 = document.createElement('div');
  div2.className = "center"
  screenSelection.appendChild(div2);

  var screen4 = document.createElement('div');
  screen4.className = "screen";
  screen4.onclick = function()
  {
    openWindow(visiblePages.midLeft.name, visiblePages.midLeft.URL);
    blockingDiv.removeChild(screenSelection);
    document.getElementById('disablingDiv').style.display='none';
  };
  var text4 = document.createTextNode("4");
  screen4.appendChild(text4);
  div2.appendChild(screen4);

  var screen5 = document.createElement('div');
  screen5.className = "screen";
  screen5.onclick = function()
  {
    openWindow(visiblePages.midCentre.name, visiblePages.midCentre.URL);
    blockingDiv.removeChild(screenSelection);
    document.getElementById('disablingDiv').style.display='none';
  };
  var text5 = document.createTextNode("5");
  screen5.appendChild(text5);
  div2.appendChild(screen5);

  var screen6 = document.createElement('div');
  screen6.className = "screen";
  screen6.onclick = function()
  {
    openWindow(visiblePages.midRight.name, visiblePages.midRight.URL);
    blockingDiv.removeChild(screenSelection);
    document.getElementById('disablingDiv').style.display='none';
  };
  var text6 = document.createTextNode("6");
  screen6.appendChild(text6);
  div2.appendChild(screen6);



  var break3 = document.createElement('br');
  screenSelection.appendChild(break3);
  var div3 = document.createElement('div');
  div3.className = "center"
  screenSelection.appendChild(div3);

  var screen7 = document.createElement('div');
  screen7.className = "screen";
  screen7.onclick = function()
  {
    openWindow(visiblePages.bottomRight.name, visiblePages.bottomRight.URL);
    blockingDiv.removeChild(screenSelection);
    document.getElementById('disablingDiv').style.display='none';
  };
  var text7 = document.createTextNode("7");
  screen7.appendChild(text7);
  div3.appendChild(screen7);

  var screen8 = document.createElement('div');
  screen8.className = "screen";
  screen8.onclick = function()
  {
    openWindow(visiblePages.bottomRightCentre.name, visiblePages.bottomRightCentre.URL);
    blockingDiv.removeChild(screenSelection);
    document.getElementById('disablingDiv').style.display='none';
  };
  var text8 = document.createTextNode("8");
  screen8.appendChild(text8);
  div3.appendChild(screen8);

  var screen9 = document.createElement('div');
  screen9.className = "screen";
  screen9.onclick = function()
  {
    openWindow(visiblePages.bottomLeftCentre.name, visiblePages.bottomLeftCentre.URL);
    blockingDiv.removeChild(screenSelection);
    document.getElementById('disablingDiv').style.display='none';
  };
  var text9 = document.createTextNode("9");
  screen9.appendChild(text9);
  div3.appendChild(screen9);

  var screen10 = document.createElement('div');
  screen10.className = "screen";
  screen10.onclick = function()
  {
    openWindow(visiblePages.bottomLeft.name, visiblePages.bottomLeft.URL);
    blockingDiv.removeChild(screenSelection);
    document.getElementById('disablingDiv').style.display='none';
  };
  var text10 = document.createTextNode("10");
  screen10.appendChild(text10);
  div3.appendChild(screen10);



  blockingDiv.appendChild(screenSelection);

  return;
}

var openWindowsOnScreens = function(visiblePages)
{
  if(allScreens.length == 1)
  {
    choosePage(visiblePages);
    return;
  }

  var chosenPages = [
    visiblePages.bottomRightCentre,
    visiblePages.bottomRight,
  ];

  for(i = 0; i < allScreens.length; i++)
  {
    openWindow(chosenPages[i].name, chosenPages[i].URL, i);
  }
}

var closeButton = document.getElementById('closeButton');
if (closeButton)
{
  window.name = 'parent';
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

var wikiButton = document.getElementById('wikiButton');
if (wikiButton)
{
  wikiButton.onclick = function()
  {
    openWindow("LIP-CMS ROC Wiki", "https://github.com/cbeiraod/LIPCMS-OperationCenter/wiki")
  };
}

var publicButton = document.getElementById('publicButton');
if (publicButton)
{
  publicButton.onclick = function()
  {
    openWindowsOnScreens(publicVisiblePages);
  };
}

var shiftButton = document.getElementById('shiftButton');
if (shiftButton)
{
  shiftButton.onclick = function()
  {
    openWindowsOnScreens(shiftVisiblePages);
  };
}

var backButton = document.getElementById('backButton');
if (backButton)
{
  backButton.onclick = function()
  {
    //window.parent.focus();
    //window.opener.location.reload(); // works
    //window.opener.parent.focus();
    window.open('','parent').focus();
  }
}
