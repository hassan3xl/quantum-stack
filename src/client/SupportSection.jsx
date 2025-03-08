const SupportSection = () => {
	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Contact Support</h2>
			<form className="space-y-4">
				<input
					type="text"
					placeholder="Your Name"
					className="w-full p-2 border rounded-lg"
				/>
				<input
					type="email"
					placeholder="Your Email"
					className="w-full p-2 border rounded-lg"
				/>
				<textarea
					placeholder="Describe your issue..."
					className="w-full p-2 border rounded-lg"></textarea>
				<button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
					Submit
				</button>
			</form>
		</div>
	);
};

export default SupportSection;
