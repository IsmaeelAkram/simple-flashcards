import card from '../card';

export default function QuizletButton({ loadCards }: { loadCards: Function }) {
	return (
		<button
			onClick={async () => {
				let res = await fetch(
					'http://us-east4-ismaeel-akram-293414.cloudfunctions.net/quizlet-to-flashcards',
					{
						body: JSON.stringify({ url: prompt('Enter quizlet URL') }),
						method: 'POST',
					}
				);
				let json = await res.json();
				loadCards(JSON.stringify(json));
			}}
		>
			load from quizlet
		</button>
	);
}
