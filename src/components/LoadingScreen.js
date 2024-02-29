import React, { useState, useEffect } from 'react';

import '../styles/LoadingScreen.css';

function LoadingScreen({ progress }) {
	const [loadMsg, setLoadMsg] = useState('Loading...');

	useEffect(() => {
		const timer = setInterval(() => {
			setLoadMsg(prevMsg => {
				const numDots = prevMsg.split('.').length - 1;

				return (numDots === 3) ? 'Loading' : prevMsg + '.';
			});
		}, 500);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="loading-bar">
			<span>{loadMsg}</span>
			<div className="bar">
				<div className="progress" style={{ width: `${progress}%` }}>
					<span>{Math.round(progress)}%</span>
				</div>
			</div>
		</div>
	);
}

export default LoadingScreen;