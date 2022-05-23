import React from 'react';
import HeaderLayout from './Header/HeaderLayout';

const App = () => {

	localStorage.removeItem('capture');
	localStorage.removeItem('setvideotime');
	localStorage.removeItem('makepositions');
	localStorage.removeItem('bakery');
	localStorage.removeItem('tasks');

	return (
	<HeaderLayout />
           )
};

export default App;
