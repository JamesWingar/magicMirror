# magicMirror
magicMirror was developed as a full stack Modular software using Django framework backend and React frontend. Includes modules: time, weather, todo list and calendar, designed to be run on a local network for multiple devices to connect and display the UI within the home. Modules that can be configured with user specific accounts, in which the backend will control most of the API calls to the account (ie. Calendar and Todoist) which can be access via a REST API that the frontend utilises. magicMirror software supports being hosted on windows and linux machines, but has mainly been tested and developed on Linux Mint and Raspberry Pi. This is intended to be developed into a controllable home system with an easy to access UI, but at the moment can be displayed on a magic mirror and other devices but navigating to the host IP.

## Screenshots
<p align="center">
  <img src="https://github.com/JamesWingar/magicMirror/blob/master/src/example_screenshot_2560_1440.png" width="1000">
</p>

## Summary
* Project creates simple UI for modules listed below.
* Server hosted loclly utilising django backend.
* Frontend can be loaded on any device on the local network, designed for home networks.
* Configuration of modules is required for APIs to work correctly. 

## Included Modules

### Time
The **time** module is simply created by calling moment.js for the time and date.

### Weather
The **weather** module uses [Openweathermap api](https://openweathermap.org/) to get the local weather two sets of time: current and forecast. The current weather has the current weather in the city stated in the config file, the forecast weather predicts the weather within 2-5 hours time. The weather module can be activated by creating an Open weather map account and generating an API key, then adding this key to the config file.

### To do list
The **To do list** module uses [Todoist api](https://todoist.com/) to get the list of jobs with the date due and display in a clean UI. The To do list updates within 20 seconds after a delete, add or complete jobs to the Todoist project. The module requires a Todoist account to be made add to the config file an API key, this comes from the Todoist account, the project id and associated user ids.

### Calendar
The calendar module uses [Google calendar](https://calendar.google.com/calendar/r) to keep track of events for the next two weeks and displays in a modern designed UI. The calendar tracks the current day with a highlighted box and updates the events within 20 seconds. The calendar requires a Google account with a set up calendar, the calendar id can be found on the settings of the calendar. The google account must be enabled as a service account and the credentials downloaded and added under the config directory.

## Install
To install follow the instructions below:
1. Open a command line tool (eg. Linux -> Terminal, Windows -> Powershell)
2. Initial requirements, install the following:
* [git](https://git-scm.com/downloads)
* [python3](https://www.python.org/download/releases/3.0/) (magicMirror supports Python3.8+)
* [pip](https://pypi.org/project/pip/)
4. Change directory to where you want the repository
5. Clone the repository
```python
git clone https://github.com/JamesWingar/magicMirror
```
5. Change directory to inside the repository `magicMirror`
6. Install the python packages
```python
pip install -r requirements.txt
```
7. Install node.js
```python
sudo apt install -y nodejs
```
8. Build frontend
```python
cd ./magicMirror/frontend/
npm run build
```
9. You are ready to go!

(*Note: you can use a virtual environment at step 6 to install the python packages*)

## Config
Below is an example config file that can be found in `magicMirror/magicMirror/config/example_config.yml`

```python
#Example configuration file
#Randomly generated data below

calendar:
    id: 1309uv4nut9e84eriuefg48934@group.calendar.google.com
host:
  ip: 192.168.1.0
job:
    key: 73f8646b0cff5cd869e6b2f4eb02179ab5196353
    project_id: 3456356346
    users:
      42352436: seaborn
      65765744: zieglar
      13495864: barlet
weather:
    city: London,uk
    key: vmsrdiofje34956834fn49runf332349udgdw
```
The Openweathermap api key must go under `weather` and the Google calendar id under `calendar` etc.

## Starting magicMirror
### Start django server
*Open a commandline and change the directory to the `magicMirror` directory*
```python
python manager.py runserver 0:8000
```
*Starts the Django host to the local host ip*
*Leave this commandline open*
You can now access the magicMirror webApp from any device on the local network by navigating to the host ip.

## Setup a magic mirror
### Remove mouse
*Open a second commandline, the following instructions are on a debian system (raspberry pi) to create a magic mirror*
```python
sudo apt install unclutter
unclutter -idle 0
```
*Sets the mouse to be invisible*

### Set display screen
*Open a third commandline*
```python
export DISPLAY=:0
```
*Defines the screen to make into kiosk mode*

### Open chrome to local server webpage
```python
chromium-browser --kiosk --app=http://<HOST_IP>:8000/home/day
```
*This opens a chromium-browser in kiosk mode and should display the MagicMirror software*

## ToDo
* Add notes module
* Create admin page to move, remove and add modules
