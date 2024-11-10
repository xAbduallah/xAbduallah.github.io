//It is possible to give the key and value a name like { quote : "", auther : "" }, but I prefer this case.
var Quotes = [
    ["The greatest strength lies not in power but in the quiet resilience of the human spirit.", "— Emily Patterson"],
    ["Kindness is the one gift that always returns, creating endless ripples the hearts it touches.", "— James Whitaker"],
    ["Dreams are whispers of our potential, urging us to become more than we ever possible.", "— Ava Montgomery"],
    ["Happiness isn’t a place we reach; it’s the journey of appreciating life’s smallest moments.", "— Lucas Thompson"],
    ["True success is defined not by wealth but by the positive impact we leave on others.", "— Isabella Bennett"],
    ["In times of darkness, even the smallest spark of hope can light the path forward.", "— Oliver Hayes"],
    ["Courage is found in the decision to try again, even after countless failures and setbacks.", "— Sophia Williams"],
    ["Gratitude transforms what we have into enough, reminding us of life’s simple profound gifts.", "— Henry Clarke"],
    ["Love is the silent force that binds the universe, invisible but deeply felt by all.", "— Nora Fitzgerald"],
    ["The future belongs to those who dream, believe in themselves, and persist despite obstacles.", "— Ethan Carter"]
];

var currectIndex = -1;
function GetRandomQuote() {
    var randomIndex = -1;
    do
    {
        randomIndex = Math.floor(Math.random() * Quotes.length);
    } while (randomIndex === currectIndex && currectIndex != -1);

    currectIndex = randomIndex;
    document.getElementById("quote").textContent = `${Quotes[currectIndex][0]}`;
    document.getElementById("author").textContent = `${Quotes[currectIndex][1]}`;
}

//Another way to get the quote in order
function GetQuoteInOrder() {
    if (currectIndex < Quotes.length - 1)
        currectIndex++;
    else
        currectIndex = 0;

    document.getElementById("quote").textContent = `${Quotes[currectIndex][0]}`;
    document.getElementById("author").textContent = `${Quotes[currectIndex][1]}`;
}