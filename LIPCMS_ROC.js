

var strWindowFeatures = "toolbar=no,menubar=no,location=no,resizable=no,scrollbars=yes,status=no";

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

var chosenPages = [
  shiftVisiblePages.bottomLeft,
  shiftVisiblePages.bottomLeftCentre,
];

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

var wikiButton = document.getElementById('wikiButton');
if (wikiButton)
{
  wikiButton.onclick = function()
  {
    openWindow("LIP-CMS ROC Wiki", "https://github.com/cbeiraod/LIPCMS-OperationCenter/wiki")
  };
}
