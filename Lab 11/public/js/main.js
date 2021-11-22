(function ($) {
    $(document).ready(function () {
        initShows();
    });

    $(document).on("submit", "form#searchForm", function (event) {
        event.preventDefault();

        hideError();
        hideMessage();

        const searchKeyword = $("#search_term").val().trim();

        if (searchKeyword.length < 1 || !searchKeyword) {
            showError("Search keyword cannot be empty.");
            return;
        }

        $("#showList").html("");

        searchShow(searchKeyword);
        showHomeLink();
    });

    function initShows() {
        $.ajax({
            url: `http://api.tvmaze.com/shows`,
            method: "GET",
        }).then(function (data) {
            displayShows(data);
        });
    }

    function searchShow(searchKeyword) {
        const searchUrl = `https://api.tvmaze.com/search/shows?q=${searchKeyword}`;

        $.ajax({
            url: searchUrl,
            method: "GET",
        }).then(function (data) {
            displaySearchedShows(data);
        });
    }

    function displayShows(shows) {
        let listHtml = ``;

        for (const currentShow of shows) {
            listHtml += `<li>
                            <a href="${currentShow._links.self.href}">
                                ${currentShow.name}
                            </a>
                        </li>`;
        }

        $("#showList").append(listHtml);

        $("#showList").show();
    }

    function displaySearchedShows(shows) {
        if (shows.length < 1) {
            showMessage("No shows found.");

            return;
        }

        let listHtml = ``;

        for (const currentShow of shows) {
            listHtml += `<li>
                            <a href="${currentShow.show._links.self.href}">
                                ${currentShow.show.name}
                            </a>
                        </li>`;
        }

        $("#showList").append(listHtml);

        $("#showList").show();
    }

    function showError(errorMessage) {
        $("#error").html(errorMessage);
        $("#error").show();
    }

    function hideError() {
        $("#error").hide();
    }

    function showMessage(message) {
        $("#message").text(message);
        $("#message").show();
    }

    function hideMessage() {
        $("#message").hide();
    }

    function showHomeLink() {
        $("#homeLink").show();
    }

    function hideHomeLink() {
        $("#homeLink").hide();
    }
})(jQuery);
