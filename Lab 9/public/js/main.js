(function () {
    const palindromeForm = document.getElementById("palindrome-form");
    const phraseInput = document.getElementById("phrase");
    const attemptsOrderedList = document.getElementById("attempts");
    const errorElement = document.getElementById("error");

    palindromeForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const phrase = phraseInput.value.trim();

        if (phrase.length < 1 || !phrase) {
            showError("Phrase cannot be empty.");
            palindromeForm.reset();
            phraseInput.focus();
            return;
        }

        const isValidString = validatePhrase(phrase);

        if (!isValidString) {
            showError("Phrase should have alphanumeric characters.");
            palindromeForm.reset();
            phraseInput.focus();
            return;
        }

        hideError();

        const isPalindrome = isPhrasePalindrome(phrase);

        const newOrderedListElementClass = isPalindrome
            ? "is-palindrome"
            : "not-palindrome";

        const newOrderedListElement = document.createElement("li");

        const newOrderedListElementText = document.createTextNode(phrase);

        newOrderedListElement.appendChild(newOrderedListElementText);

        newOrderedListElement.className = newOrderedListElementClass;

        attemptsOrderedList.appendChild(newOrderedListElement);

        palindromeForm.reset();
        phraseInput.focus();
    });

    function validatePhrase(phrase) {
        const noSpacePhrase = removeSpaces(phrase);

        const noSpecialCharacters = removeSpecialCharacters(noSpacePhrase);

        if (noSpecialCharacters.length < 1 || !noSpecialCharacters) {
            return false;
        }

        return true;
    }

    function removeSpaces(str) {
        return str.replace(/\s/g, "");
    }

    function removeSpecialCharacters(str) {
        return str.replace(/[^a-zA-Z0-9]/g, "");
    }

    function reverseString(str) {
        return str.split("").reverse().join("");
    }

    function isPhrasePalindrome(phrase) {
        const noSpacePhrase = removeSpaces(phrase);

        const noSpecialCharacters = removeSpecialCharacters(noSpacePhrase);

        const lowerCasePhrase = noSpecialCharacters.toLowerCase();

        const reversedString = reverseString(lowerCasePhrase);

        return lowerCasePhrase === reversedString;
    }

    function showError(errorMessage) {
        errorElement.innerHTML = errorMessage;
        errorElement.hidden = false;
    }

    function hideError() {
        errorElement.hidden = true;
    }
})();
