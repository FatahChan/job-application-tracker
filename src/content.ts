import browser from "webextension-polyfill";

function parseLinkedinJobPosting() {
  const jobPosting = {
    role: document
      .querySelector("[class*=__job-title]")
      ?.textContent?.replace(/\n/g, "")
      .trim(),
    company: document
      .querySelector("[class*=__company-name]")
      ?.textContent?.replace(/\n/g, "")
      .trim(),
    posting: window.location.href,
  };
  if (!jobPosting.role || !jobPosting.company) {
    throw new Error("Could not parse job posting");
  }
  return jobPosting;
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.action !== "parseJobPosting") return true;
  let jobPosting;
  try {
    switch (window.location.origin) {
      case "https://www.linkedin.com": {
        if (window.location.pathname.includes("/jobs/")) {
          jobPosting = parseLinkedinJobPosting();
          break;
        }
        throw new Error("Not a job posting page");
      }
      default: {
        throw new Error("Not a supported website");
      }
    }
  } catch (error) {
    // @ts-expect-error - sendResponse takes in arguments
    sendResponse({ error: error });
    return true;
  }
  // @ts-expect-error - sendResponse takes in arguments
  sendResponse(jobPosting);
  return true;
});
