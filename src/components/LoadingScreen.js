import React from 'react';

import '../styles/LoadingScreen.css';

function LoadingScreen(props) {
	return (
		<div className="loading-screen">
			<div className="loading-bar">
				<p>Loading...</p>
				<div className="bar">
					<div className="progress" style={{ width: `${props.progress}%` }}>
						<p>{Math.round(props.progress)}%</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoadingScreen;