import React from 'react'
import icon from '../images/scribble-icon.png'

const About = () => {
  return (
    <div>
      <div className='about-heading'>
        <img id='about-image' src={icon} alt="scribble icon" /> <h2>Scribble - The Most Convenient Notebook</h2>
      </div>
      <div className='about-content'>
        <h3>Features: </h3>
        <p>
          <b>Easy To Use-</b> The Simple UI makes it easier to be used by anyone.
          <br/><br/>
          <b>Safe and Synced-</b> Tired of not having the right info handy when you need it? Scribble automatically saves notes online and syncs them to all your devices.
          <br/><br/>
          <b>Secure-</b> Scribble uses email and password based authentication for verifying user and only authorized user can see their own notes.
        </p>
      </div>
      <div className='about-content'>
        <h3>How It works: </h3>
        <p>
          <b>Own API-</b>Scribble uses its own API for interacting with database server.
          <br/><br/>
          <b>MongoDB-</b> The Data is securely stored on MongoDB server ensuring no data leak issues.
          <br/><br/>
          <b>Password Safety-</b> Password are always stored after encryption and can't be fetched as clear text.
        </p>
      </div>
      <div className='about-content'>
        <h3>About us: </h3>
        <p>
          This web application was built as a MERN Stack Project and uses MongoDB, Express.js, React.js and Node.js for the development. The Developer is web development enthusiast and a MERN Stack Developer. More such projects can be found on the developer's github repositories. 
          <br/><br/>
        </p>
      </div>

    </div>
  )
}

export default About