[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/vincentlev/verifyhut-mern-fullstack)
![](https://img.shields.io/netlify/7b9e85c2-f681-4e34-9d44-08312640a0e5?style=flat-square)
[![License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
![](https://img.shields.io/github/issues-raw/VincentLeV/verifyhut-mern-fullstack?style=flat-square)
<br/>

# VerifyHut

## Table of Contents
[Introduction](#introduction)
<br/>
[Features](#features)
<br/>
[Tech Stack](#tech-stack)
<br/>
[Run The Project Locally](#run-the-project-locally)
<br/>
[UI Examples](#ui-examples)
<br/>
[Demo](#demo)

## Introduction
VerifyHut is the app that allows users to create signatures and verify the transactions if necessary in their daily lives. Among the daily activities, sometimes we need to ask for the counterpart's signature just to make sure. For example, this app would be useful when selling and buying second-handed stuff online.

## Features
- Create/Read/Delete users
- Create/Read/Update/Delete categories
- Signature is created on a sign board, can be cleared, undo or redo
- Create/Read/Delete signatures
- Export signatures to PNG or SVG
- Session is created for each login, the session expires in 1 hour
- Cross-functional 

## Tech Stack

1. ReactJS
2. MaterialUI
3. Sass
4. NodeJS
5. ExpressJS
6. MongoDB

## Run The Project Locally

:loudspeaker: For all of the step below: make sure that you're in the project's directory :loudspeaker:

### Using Terminal and VSCode

1. Run the Backend
        
        cd server
        npm run start

2. Run the Frontend

        cd client
        yarn start

<p align="center">Check the app out at <a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a></p>

### Using Docker

    ./deploy.ps1

<p align="center">Check the app out at <a href="http://localhost:8080/" target="_blank">http://localhost:8080/</a></p>

### E2E Testing

    yarn run cypress

## UI Examples
<p align="center">
    <img src="https://user-images.githubusercontent.com/49280437/158251657-38ec3d25-e97c-4515-bc1a-38aab42128c1.jpg" alt="1" width="500px" />
</p>

<p align="center">
    <img src="https://user-images.githubusercontent.com/49280437/158251669-a40a6d1c-af08-44dc-88e2-0a0215587818.jpg" alt="2" width="500px" />
</p>

<p align="center">
    <img src="https://user-images.githubusercontent.com/49280437/158251677-f94c3cfd-7469-4f2d-8f74-5b18a4cc5e80.jpg" alt="3" width="500px" />
</p>

## Demo
<a href="https://verifyhut.netlify.app/" target="_blank">
    <p align="center">https://verifyhut.netlify.app/</p>
</a>

<p align="center">
    <img src="https://user-images.githubusercontent.com/49280437/158255631-64fe4556-39d3-43d2-8960-9121c3d04d33.gif" alt="gif" />
</p>