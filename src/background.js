'use strict';
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_CONTENT') {

    octokit.repos.getContent({
      owner: 'aws-samples',
      repo: 'serverless-snippets',
      path: ''
    }).then(response => {
      try {
        chrome.contextMenus.create({
          contexts: ["all"],
          id: "context-menu-id",
          title: "CloudWatch Logs Insights Snippets",
          documentUrlPatterns: ["about:blank", "*://*.console.aws.amazon.com/*"]
        });
        for (const snippet of response.data.filter(p => p.name.startsWith("cloudwatch-insight"))) {
          try {
            let name = snippet.name.replace("cloudwatch-insight-", "").replace(/-/g, " ");
            chrome.contextMenus.create({
              contexts: ["all"],
              id: snippet.name,
              parentId: "context-menu-id",
              title: name.charAt(0).toUpperCase() + name.slice(1),
              documentUrlPatterns: ["about:blank", "*://*.console.aws.amazon.com/*"]
            });
            chrome.contextMenus.create({
              contexts: ["all"],
              id: snippet.name + "-copy",
              parentId: snippet.name,
              title: "Copy to clipboard",
              documentUrlPatterns: ["about:blank", "*://*.console.aws.amazon.com/*"]
            });
            chrome.contextMenus.create({
              contexts: ["all"],
              id: snippet.name + "-open-url",
              parentId: snippet.name,
              title: "Open in new tab",
              documentUrlPatterns: ["about:blank", "*://*.console.aws.amazon.com/*"]
            });
          } catch (e) {
            //console.log(e);
          }
        }
      } catch (e) {
      }
    }).catch(error => {
      console.log(error);
    });
    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
      console.log(info.menuItemId);
      if (info.menuItemId.match(/^cloudwatch-insight-.+-copy$/)) {
        octokit.repos.getContent({
          owner: 'aws-samples',
          repo: 'serverless-snippets',
          path: info.parentMenuItemId + "/snippet.txt"
        }).then(result => {
          console.log(atob(result.data.content));
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "SNIPPET", snippet: atob(result.data.content) }, function (response) { });
          });
        })
      }
      if (info.menuItemId.match(/^cloudwatch-insight-.+-open-url$/)) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { type: "URL", url: `https://serverlessland.com/snippets/${info.parentMenuItemId}` }, function (response) { });
        });
      }
    });

    return true;
  }
});
