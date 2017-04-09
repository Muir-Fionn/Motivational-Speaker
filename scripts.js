/*--- Variables ---*/
/* DOM Variables */
var dom = {
  home: document.querySelector('.home'),
  about: document.querySelector('.about'),
  events: document.querySelector('.events'),
  resume: document.querySelector('.resume'),
  contact: document.querySelector('.contact'),
  nav: document.querySelector('.nav'),
  active: document.querySelector('.display')
};

var nav = {
  home: document.querySelectorAll('[name="home"]'),
  about: document.querySelectorAll('[name="about"]'),
  events: document.querySelectorAll('[name="events"]'),
  resume: document.querySelectorAll('[name="resume"]'),
  contact: document.querySelectorAll('[name="contact"]')
}

/* Div Variable Arrays and Objects */
var upcoming = [
  {
    title: "Women In Tech",
    location: 'Boston, MA',
    date: '15 May 2017',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: 'NASA Spotlight',
    location: 'Melborne, FL',
    date: '2 June 2017',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: 'SLS Working Group',
    location: 'Birmingham, Alabama',
    date: '15 June 2017',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];

var positions = [
  {
    title: 'Design Engineer and Stress Analyst Intern',
    company: 'Boeing',
    employed: 'Jun 2016 – Present',
    location: 'Huntsville, Alabama',
    description: 'Support design and analysis efforts for the Space Launch System, which is the largest rocket in history with missions to Mars and other beyond Earth orbit destinations'
  },
  {
    title: 'Systems Engineering Intern',
    company: 'Boeing',
    employed: 'Jun 2015 – Jun 2016',
    location: 'Huntsville, Alabama',
    description: 'Support engineering team in developing and analyzing aerospace systems.'
  }
];

var education = [
  {
    name: 'Massachusetts Institute of Technology',
    degree: 'Bachelor of Science (BS) Field Of Study Aerospace, Aeronautical and Astronautical Engineering',
    years: '2013 – 2017',
    activities: "National Society of Black Engineers, Black Students' Union, Black Women's Alliance, MIT American Institute of Aeronautics and Astronautics, Society of Women Engineers, African Dance Team, MIT Intervarsity"
  },
  {
    name: 'Wheeler High School',
    degree: 'High School',
    years: '2009 - 2013',
    activities: "National Honor Society, National Beta Club, Science Honor Society, Math Honor Society, Social Studies Honor Society, Delta Sigma Theta Debutante Program, Dance Ministry, Wind Ensemble, Concert Band, Symphonic Band, Tennis, English Honor Society"
  }
]

/*--- Functions ---*/
/*Functions to Execute on Page Load */
document.onreadystatechange = () => {
 if (document.readyState === 'complete') {
   eventsFill();
   resumeFill();
   addNavClickEvents();
 }
};

/* Click Event Functions */
function addNavClickEvents() {
  for(key in nav) {
    var el = nav[key];
    for(i=0; i < el.length; i++) {
      el[i].addEventListener('click', function(){
        var section = this.getAttribute('name');

        if(section === 'home') {
          dom.nav.style.display = 'none';
        }else{
          dom.nav.style.display = 'flex';
        }

        console.log(dom[section]);

        dom.active.classList.remove('display');
        dom[section].classList.add('display');
        dom.active = dom[section];
      });
    }
  }
}

/* DOM Build Functions */
// Fill events Events Section
function eventsFill() {
  var header = makeElement('h1', 'title', 'Upcoming Events');
  dom.events.appendChild(header);

  upcoming.forEach(function(el) {
    var container = makeElement('div', 'event', null);
    var title = makeElement('h2', 'subtitle', el.title);
    var date = makeElement('span', 'date', el.date);
    var location = makeElement('span', 'location', el.location);
    var description = makeElement('p', 'eventDescription', el.description);

    appendChildren(container, title, location, date, description);

    dom.events.appendChild(container);
  });
}

//Fill CSV section
function resumeFill() {
  var header = makeElement('h1', 'title', 'CSV');
  dom.resume.appendChild(header);

  educationFill();
  historyFill();
}

function historyFill() {
  var div = makeElement('div', 'workHistory', null)
  var header = makeElement('h2', 'resumeTitle', 'Work History');
  div.appendChild(header);

  positions.forEach(function(el) {
    var container = makeElement('div', 'position', null);
    var title = makeElement('h3', 'subtitle', el.title);
    var company = makeElement('span', 'company', el.company);
    var employed = makeElement('span', 'employed', el.employed);
    var location = makeElement('span', 'location', el.location);
    var description = makeElement('p', 'positionDescription', el.description);

    appendChildren(container, title, company, location, employed, description);

    div.appendChild(container);
  });

  dom.resume.appendChild(div);
}

//Fill education
function educationFill() {
  var div = makeElement('div', 'education', null)
  var header = makeElement('h2', 'resumeTitle', 'Education');
  div.appendChild(header);

  education.forEach(function(el) {
    var container = makeElement('div', 'school', null);
    var name = makeElement('h2', 'subtitle', el.name);
    var degree = makeElement('p', 'degree', el.degree);
    var years = makeElement('p', 'years', el.years);
    var activities = makeElement('p', 'activities', el.activities);

    appendChildren(container, name, degree, years, activities);

    div.appendChild(container);
  });

  dom.resume.appendChild(div);
}


/*
  @param type: type of html element to build
  @param style: class to apply to the Elementary, if any
  @param text: text to be contained by element
  @return HTML DOM element
*/
function makeElement(type, style, text) {
  var el = document.createElement(type);

  if(style) {
    el.classList.add(style);
  }

  if(text) {
    var text = document.createTextNode(text);
    el.appendChild(text);
  }

  return el;
}

/*
  @param parent: desired parent element for provided children
  @args: elements to be appended to parent
*/
function appendChildren(parent) {
  var children = Array.prototype.slice.call(arguments, 1);

  children.forEach(function(el) {
    parent.appendChild(el);
  })
}
