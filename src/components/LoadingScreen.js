import React from 'react';

import '../styles/LoadingScreen.css';

function LoadingScreen(props) {
	return (
		<div className="loading-screen">
			<p>Loading...</p>
			<div className="loading-bar">
				<div className="loading-progress" style={{ width: `${props.progress}%` }}>
					{Math.round(props.progress)}%
				</div>
			</div>
		</div>
	);
}

export default LoadingScreen;