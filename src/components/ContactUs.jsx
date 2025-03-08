import {FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa';

const ContactUs = () => {
	return (
		<div className="container mx-auto my-8 p-4">
			<h2 className="text-3xl font-bold mb-4">Contact Us</h2>
			<p className="mb-6">
				We'd love to hear from you! Reach out to us through any of the
				platforms below:
			</p>

			<div className="flex justify-center space-x-6">
				<a
					href="https://www.instagram.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-pink-600 hover:text-pink-800 text-4xl">
					<FaInstagram />
				</a>
				<a
					href="https://www.linkedin.com/in/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-700 hover:text-blue-900 text-4xl">
					<FaLinkedin />
				</a>
				<a
					href="https://twitter.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 hover:text-blue-700 text-4xl">
					<FaTwitter />
				</a>
			</div>

			<div className="mt-8">
				<form>
					<label
						className="block mb-2 text-sm font-bold"
						htmlFor="name">
						Name
					</label>
					<input
						type="text"
						id="name"
						className="border w-full p-2 mb-4"
						placeholder="Your Name"
					/>

					<label
						className="block mb-2 text-sm font-bold"
						htmlFor="email">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="border w-full p-2 mb-4"
						placeholder="Your Email"
					/>

					<label
						className="block mb-2 text-sm font-bold"
						htmlFor="message">
						Message
					</label>
					<textarea
						id="message"
						className="border w-full p-2 mb-4"
						rows="5"
						placeholder="Your Message"></textarea>

					<button
						type="submit"
						className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
};

export default ContactUs;
