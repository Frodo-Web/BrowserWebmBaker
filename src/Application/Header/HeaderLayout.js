import React, { useState } from 'react';
import StartPage from './StartPage';
import Capture from './Capture/Capture';
import Bakery from './Bakery/Bakery';
import Tasks from './Tasks/Tasks';
import './HeaderLayout.css';


const HeaderLayout = () => {

	const [content, setContent] = useState('');

	const startpage = () => setContent(<StartPage />);
	const capture = () => setContent(<Capture />);
	const bakery = () => setContent(<Bakery />);
	const tasks = () => setContent(<Tasks />);

	return (
	<>
		<div id="sidebar">
			<nav id="navigation">
				<a href="#startPage" onClick={startpage}>Start Page</a>
				<a href="#capture" onClick={capture}>Capture</a>
				<a href="#bakery" onClick={bakery}>Bakery</a>
				<a href="#tasks" onClick={tasks}>Tasks</a>
			</nav>
		</div>
		<div className="container">
			{content}
		</div>
	</>
	       )
};

export default HeaderLayout;
