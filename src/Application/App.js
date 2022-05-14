import React from 'react';
import HeaderLayout from './Header/HeaderLayout';

const App = () => {

	localStorage.removeItem('capture');
	localStorage.removeItem('setvideotime');
	localStorage.removeItem('makepositions');

	return (
		<HeaderLayout />
         )
};

export default App;
