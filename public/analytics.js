(function () {
  function generateUUID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }

  let visitorId = localStorage.getItem("metricflow_visitor_id");
  if (!visitorId) {
    visitorId = generateUUID();
    localStorage.setItem("metricflow_visitor_id", visitorId);
  }

  const script = document.currentScript;
  const websiteId = script.getAttribute("data-website-id");
  const domain = script.getAttribute("data-domain");

  const entryTime = Date.now();

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
    refParams
  };

  fetch("http://localhost:3000/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Active Time Tracking Info
  let activeStartTime = Date.now();
  let totalActiveTime = 0;

  const handleExit = () => {
    const exitTime = Date.now();
    totalActiveTime += Date.now() - activeStartTime;

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
      }),
    });

    localStorage.clear();
  };

  window?.addEventListener("beforeunload", handleExit);
  // window.addEventListener("pagehide", handleExit);
})();
