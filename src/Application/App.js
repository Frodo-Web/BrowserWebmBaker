import React from 'react';
import HeaderLayout from './Header/HeaderLayout';

const App = () => {

	localStorage.removeItem('capture');
	localStorage.removeItem('setvideotime');

	return (
		<HeaderLayout />
         )
};

export default App;
