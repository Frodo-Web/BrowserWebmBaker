import React, { useState } from 'react';
import StartPage from './StartPage';
import Capture from './Capture/Capture';
import Bakery from './Bakery';

const HeaderLayout = () => {

	const [content, setContent] = useState('');

	const startpage = () => setContent(<StartPage />);
	const capture = () => setContent(<Capture />);
	const bakery = () => setContent(<Bakery />);

	return (
		<>
			<nav>
				<ul>
					<li>
						<a onClick={startpage}>Start Page</a>
					</li>
					<li>
						<a onClick={capture}>Capture</a>
					</li>
					<li>
						<a onClick={bakery}>Bakery</a>
					</li>
				</ul>
			</nav>
			{content}

		</>
	       )
};

export default HeaderLayout;
