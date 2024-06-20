import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className='z-10 w-[100%] h-[10%] bg-black bottom-0  flex items-center justify-center text-red-900 mt-[5%] gap-4'>
      <h3><Link to={`https://github.com/ravichak1/moviesDB.git`}><FontAwesomeIcon icon={faGithubSquare} size='2x'/></Link></h3>
      <h3><Link to={`https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile`}><FontAwesomeIcon icon={ faLinkedinIn} size='2x'/></Link></h3>
    </footer>
  )
}

export default Footer