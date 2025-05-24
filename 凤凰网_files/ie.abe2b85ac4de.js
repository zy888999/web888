(function() {
    function isCanvasSupported() {
      // ie 7.8不支持canvas
      try {
        var e = document.createElement('canvas');
  
        return !(!e.getContext || !e.getContext('2d'));
      } catch (error) {
        return false;
      }
    }
  
    function isIe() {
      return (
          'Microsoft Internet Explorer' === navigator.appName
                || !('Netscape' !== navigator.appName || !/Trident/.test(userAgent))
        )
    }
  
    function isLowerIe() {
      var userAgent = navigator.userAgent;
      var isLowIe = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
      if (isLowIe) {
          var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
          reIE.test(userAgent);
          var fIEVersion = parseFloat(RegExp["$1"]);
          if (fIEVersion === 6 || fIEVersion === 7 || fIEVersion === 8) {
              return true;
          } else {
              return false
          }
      }
      return false;
    }
  
    function getPlatform() {
      var platform = navigator.platform.toLocaleLowerCase();
  
      if (platform !== 'win32' && platform !== 'win64') {
        return true;
      }
  
      return false;
    }
  
    function getWebDriver() {
      var webdriver = navigator.webdriver;
  
      return webdriver;
    }
  
    function indexedDbKey() {
      try {
        return window.indexedDB ? true : false;
      } catch (e) {
        return false;
      }
    }
  
    function getBrowserInfo() {
      var e,
        t = navigator.userAgent.toLocaleLowerCase(),
        n = null;
  
      return (
        null != t.match(/msie/) || null != t.match(/trident/)
          ? ((n = 'IE'),
          (browserVersion = (
            null != t.match(/msie ([\d.]+)/) ? t.match(/msie ([\d.]+)/) : t.match(/rv:([\d.]+)/)
          )[1]))
          : null != t.match(/firefox/)
            ? (n = 'firefox')
            : null != t.match(/ubrowser/)
              ? (n = 'UC')
              : null != t.match(/opera/)
                ? (n = 'opera')
                : null != t.match(/bidubrowser/)
                  ? (n = 'bidubrowser')
                  : null != t.match(/metasr/)
                    ? (n = 'sogou')
                    : null != t.match(/tencenttraveler/) || null != t.match(/qqbrowse/)
                      ? (n = 'QQ')
                      : null != t.match(/maxthon/)
                        ? (n = 'maxthon')
                        : -1 < navigator.userAgent.toLowerCase().indexOf('chrome')
                          ? ((e = ''),
                          -1
                        < (e = navigator.mimeTypes['application/x-shockwave-flash']
                          ? navigator.mimeTypes['application/x-shockwave-flash'].description.toLowerCase()
                          : e).indexOf('adobe') && (n = '360old'))
                          : null != t.match(/safari/)
                            ? (n = 'Safari')
                            : null != t.match(/chrome/)
                    && (function(e, t) {
                      var n,
                        a = navigator.mimeTypes;
  
                      for (n in a) if (a[n][e] == t) return !0;
  
                      return !1;
                    })('type', 'application/vnd.chromium.remoting-viewer')
                    && (n = '360'),
        n
      );
    }
  
    function hasLiedBrowserKey() {
      var e = navigator.userAgent.toLowerCase(),
        t = navigator.productSub,
        e = 0 <= e.indexOf('firefox')
                    ? 'Firefox'
                    : 0 <= e.indexOf('opera') || 0 <= e.indexOf('opr')
                      ? 'Opera'
                      : 0 <= e.indexOf('chrome')
                        ? 'Chrome'
                        : 0 <= e.indexOf('safari')
                          ? 'Safari'
                          : 0 <= e.indexOf('trident')
                            ? 'Internet Explorer'
                            : 'Other';
  
      if (('Chrome' === e || 'Safari' === e || 'Opera' === e) && '20030107' !== t) {
        return 1;
      }
      var n,
        t = eval.toString().length;
  
      if (37 === t && 'Safari' !== e && 'Firefox' !== e && 'Other' !== e) {
        return 1;
      }
      if (39 === t && 'Internet Explorer' !== e && 'Other' !== e) return 1;
      if (33 === t && 'Chrome' !== e && 'Opera' !== e && 'Other' !== e) {
        return 1;
      }
      try {
        throw 'a';
      } catch (a) {
        try {
          a.toSource(), (n = !0);
        } catch (r) {
          n = !1;
        }
      }
  
      return n && 'Firefox' !== e && 'Other' !== e ? 1 : 0;
    }
  
    function hasliedPlugin() {
      if (
        !(navigator.plugins instanceof PluginArray)
              || navigator.plugins.length === 0
              || window.navigator.plugins[0].toString() !== '[object Plugin]'
      ) {
        return true;
      }
  
      return false;
    }
  
    function hasLiedUa() {
      var ua = navigator.userAgent.toLocaleLowerCase;
  
      return /chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|spider|headlesschrome/.test(
        ua
      );
    }
  
    function lied() {
      var hardwareConcurrency = navigator.hardwareConcurrency;
      var vendor = navigator.vendor;
      var doNotTrack = navigator.doNotTrack;
      var cpuClass = navigator.cpuClass;
  
      try {
        new window.ActiveXObject('Microsoft.XMLHTTP');
      } catch (error) {
        return true;
      }
  
      if (hardwareConcurrency || vendor || doNotTrack || !cpuClass || window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.Worker) {
        return true;
      }
    }
  
    function runBotDetection() {
      var documentDetectionKeys = [
        '__webdriver_evaluate',
        '__selenium_evaluate',
        '__webdriver_script_function',
        '__webdriver_script_func',
        '__webdriver_script_fn',
        '__fxdriver_evaluate',
        '__driver_unwrapped',
        '__webdriver_unwrapped',
        '__driver_evaluate',
        '__selenium_unwrapped',
        '__fxdriver_unwrapped',
        'webdriver',
        '__driver_evaluate',
        '__webdriver_evaluate',
        '__selenium_evaluate',
        '__fxdriver_evaluate',
        '__driver_unwrapped',
        '__webdriver_unwrapped',
        '__selenium_unwrapped',
        '__fxdriver_unwrapped',
        '_Selenium_IDE_Recorder',
        '_selenium',
        'calledSelenium',
        '_WEBDRIVER_ELEM_CACHE',
        'ChromeDriverw',
        'driver-evaluate',
        'webdriver-evaluate',
        'selenium-evaluate',
        'webdriverCommand',
        'webdriver-evaluate-response',
        '__webdriverFunc',
        '__webdriver_script_fn',
        '__$webdriverAsyncExecutor',
        '__lastWatirAlert',
        '__lastWatirConfirm',
        '__lastWatirPrompt',
        '$chrome_asyncScriptInfo',
        '$cdc_asdjflasutopfhvcZLmcfl_'
      ];
  
      var windowDetectionKeys = [
        '_phantom',
        '__nightmare',
        '_selenium',
        'callPhantom',
        'callSelenium',
        '_Selenium_IDE_Recorder'
      ];
  
      for (var windowDetectionKey in windowDetectionKeys) {
        var windowDetectionKeyValue = windowDetectionKeys[windowDetectionKey];
  
        if (window[windowDetectionKeyValue]) {
          return true;
        }
      }
      for (var documentDetectionKey in documentDetectionKeys) {
        var documentDetectionKeyValue = documentDetectionKeys[documentDetectionKey];
  
        if (window['document'][documentDetectionKeyValue]) {
          return true;
        }
      }
  
      for (var documentKey in window['document']) {
        if (documentKey.match(/\$[a-z]dc_/) && window['document'][documentKey]['cache_']) {
          return true;
        }
      }
  
      // if (window['external'] && window['external'].toString() && (window['external'].toString()['indexOf']('Sequentum') != -1)) return true;
  
      if (window['document']['documentElement']['getAttribute']('selenium')) return true;
      if (window['document']['documentElement']['getAttribute']('webdriver')) return true;
      if (window['document']['documentElement']['getAttribute']('driver')) return true;
  
      return false;
    };
  
    function isRealPerson() {
      if (
        getWebDriver()
              || getPlatform()
              || !isIe()
              || isCanvasSupported()
              || indexedDbKey()
              || getBrowserInfo() !== 'IE'
              || hasLiedBrowserKey() === 1
              || hasLiedUa()
              || lied()
              || runBotDetection()
      ) {
        return 0;
      }
  
      return 1;
    }
  
  
    try {
      // 真正的人是1 机器人是0
      var isTrusted = isRealPerson();
      if (isLowerIe()) {
          var error = new Error("isTrusted: " + isTrusted);
          if (window && window.BJ_REPORT){
              window.BJ_REPORT.report(error, false, isTrusted ? 41 : 40);
          } 
      }
      return isTrusted;
    } catch (error) {
        console.log(error);
    }
  })();
  