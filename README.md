# Job Application Tracker

A Chrome extension that opens up a side panel to help you track your job applications

## Features

#### New Application From
<img width="740" alt="image" src="https://github.com/FatahChan/job-application-tracker/assets/30260221/9e0692c0-c783-45a0-bea8-e80f40eaf541">

#### Applications Table With Filter and Search
<img width="717" alt="image" src="https://github.com/FatahChan/job-application-tracker/assets/30260221/a02aea76-5b3a-4789-ae74-f447b91f33a7">

#### Delete and Edit Actions
<img width="202" alt="image" src="https://github.com/FatahChan/job-application-tracker/assets/30260221/4514e588-766e-4f14-92dc-a7aa104f2b48">


### Pending Features

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
  





## Dev environment

clone the repo

install dependency

```bash
pnpm install
```

Create a appwrite account

login to cli

```bash
pnpm appwrite login
```

create a project, I recommend naming the project "Job Application Tracker"

```bash
pnpm appwrite init project
```

create a database

```bash
pnpm appwrite databases --name 'Job Application Tracker' --databaseId 'unique()'
```

create a collection, use the databaseId from the previous command

```bash
pnpm appwrite databases createCollection --databaseId '{databaseId}' --name 'Applications' --collectionId 'unique()' --permissions 'create("users")' --documentSecurity true
```

pull the database

```bash
pnpm appwrite init collection
```

add the attribute in `appwrite.json`

```json
{
  "collections": [
    {
      ...,
      "attributes": [
        {
          "key": "notes",
          "type": "string",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "size": 2048,
          "default": null
        },
        {
          "key": "posting",
          "type": "string",
          "status": "available",
          "error": "",
          "required": true,
          "array": false,
          "format": "url",
          "default": null
        },
        {
          "key": "rejectionDate",
          "type": "datetime",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "format": "",
          "default": null
        },
        {
          "key": "offerDate",
          "type": "datetime",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "format": "",
          "default": null
        },
        {
          "key": "salary",
          "type": "integer",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "min": 0,
          "max": 1000000,
          "default": null
        },
        {
          "key": "acceptanceDate",
          "type": "datetime",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "format": "",
          "default": null
        },
        {
          "key": "role",
          "type": "string",
          "status": "available",
          "error": "",
          "required": true,
          "array": false,
          "size": 128,
          "default": null
        },
        {
          "key": "company",
          "type": "string",
          "status": "available",
          "error": "",
          "required": true,
          "array": false,
          "size": 128,
          "default": null
        },
        {
          "key": "applicationDate",
          "type": "datetime",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "format": "",
          "default": null
        },
        {
          "key": "interviewDate",
          "type": "datetime",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "format": "",
          "default": null
        },
        {
          "key": "status",
          "type": "string",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "elements": [
            "applied",
            "scheduledInterview",
            "interviewed",
            "offered",
            "rejected",
            "accepted"
          ],
          "format": "enum",
          "default": "applied"
        }
      ]
    }
  ]
}
```

deploy the collection

```bash
pnpm appwrite deploy collection
```

#### Install the extension

Enable developer mode on your browser extension page

Click on Load unpacked extension

Select the dist dir from the project
