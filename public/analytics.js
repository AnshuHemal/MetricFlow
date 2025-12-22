(function () {
  function generateUUID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }

  const session_duration = 12 * 60 * 60 * 1000; // 12 hrs
  const now = Date.now();

  let visitorId = localStorage.getItem("metricflow_visitor_id");
  let sessionTime = localStorage.getItem("metricflow_session_time");

  if (!visitorId || now - sessionTime > session_duration) {
    if (visitorId) {
      localStorage.removeItem("metricflow_visitor_id");
      localStorage.removeItem("metricflow_session_time");
    }
    visitorId = generateUUID();
    localStorage.setItem("metricflow_visitor_id", visitorId);
    localStorage.setItem("metricflow_session_time", now);
  } else {
  }

  const script = document.currentScript;
  const websiteId = script.getAttribute("data-website-id");
  const domain = script.getAttribute("data-domain");

  const entryTime = Math.floor(Date.now() / 1000);

  const referrer = document.referrer || "Direct";

  const urlParams = new URLSearchParams(window.location.search);
  const utm_source = urlParams.get("utm_source") || "";
  const utm_medium = urlParams.get("utm_medium") || "";
  const utm_campaign = urlParams.get("utm_campaign") || "";
  const utm_term = urlParams.get("utm_term") || "";
  const utm_content = urlParams.get("utm_content") || "";
  const refParams = window.location.href.split("?")[1] || "";

  const data = {
    type: "entry",
    websiteId,
    domain,
    entryTime: entryTime,
    referrer,
    url: window.location.href,
    visitorId: visitorId,
    urlParams,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    refParams,
  };

  fetch("http://localhost:3000/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Active Time Tracking Info
  let activeStartTime = Math.floor(Date.now() / 1000);
  let totalActiveTime = 0;

  const handleExit = () => {
    const exitTime = Math.floor(Date.now() / 1000);
    totalActiveTime += Math.floor(Date.now() / 1000) - activeStartTime;

    fetch("http://localhost:3000/api/track", {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "exit",
        websiteId,
        domain,
        exitTime: exitTime,
        totalActiveTime: totalActiveTime,
        visitorId: visitorId,
        exitUrl: window.location.href,
      }),
    });

    // localStorage.clear();
  };

  window?.addEventListener("beforeunload", handleExit);
  // window.addEventListener("pagehide", handleExit);
})();
