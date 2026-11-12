# Job Application Tracker

A Chrome extension that opens up a side panel to help you track your job applications

## Features

### New Application From

<img width="740" alt="image" src="https://github.com/FatahChan/job-application-tracker/assets/30260221/9e0692c0-c783-45a0-bea8-e80f40eaf541">

### Applications Table With Filter and Search

<img width="717" alt="image" src="https://github.com/FatahChan/job-application-tracker/assets/30260221/a02aea76-5b3a-4789-ae74-f447b91f33a7">

### Delete and Edit Actions

<img width="202" alt="image" src="https://github.com/FatahChan/job-application-tracker/assets/30260221/4514e588-766e-4f14-92dc-a7aa104f2b48">

### Export and Import

Applications are stored on your device with `chrome.storage.local`; there is no account or server. Use **Export** to save a JSON backup and **Import** to restore it or move it to another browser. Importing merges by id, so re-importing the same file doesn't create duplicates.

## Pending Features

- Auto-load applications from with data LinkedIn job is opened on the side
- PDF application storage
- Sync between devices

## Installing

1. Download the extension zip file here [here](https://github.com/FatahChan/Job-Application-Tracker/releases)
2. Unzip the file
3. Open the Extensions tab
   ![image](https://github.com/FatahChan/job-application-tracker/assets/30260221/d87695e2-a2a1-441e-8640-575ef9232c36)
4. Enable developer mode
   ![image](https://github.com/FatahChan/job-application-tracker/assets/30260221/59117c8a-551e-4094-a186-bb4b7e9023dd)
5. Click on load unpacked and select the unzipped `dist` folder
6. Pin the extension
   ![image](https://github.com/FatahChan/job-application-tracker/assets/30260221/b726d508-4462-4702-883f-04475630e1de)

## Dev environment

```bash
pnpm install
pnpm build   # or `pnpm watch` while developing
```

Then open `chrome://extensions`, enable developer mode, click **Load unpacked** and select the `dist` folder.
