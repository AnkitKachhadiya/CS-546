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

            $("#searchForm").get(0).reset();
            $("#search_term").focus();

            return;
        }

        hideShowList();
        hideShow();
        searchShow(searchKeyword);
        showHomeLink();
    });

    $(document).on("click", "ul#showList > li > a", function (event) {
        event.preventDefault();

        hideError();
        clearShow();
        showHomeLink();
        hideShowList();

        const showUrl = $(this).attr("href");

        getShow(showUrl);
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

    function getShow(showUrl) {
        $.ajax({
            url: showUrl,
            method: "GET",
        }).then(function (data) {
            displayShow(data);
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

    function displayShow(show) {
        let html = ``;

        const title = !show.name || show.name.length < 1 ? "N/A" : show.name;

        html += `<h1>
                    ${title}
                </h1>`;

        const imageUrl =
            !show.image || Object.keys(show.image).length < 1
                ? "/public/image/no_image.jpeg"
                : show.image.medium;

        html += `<img src="${imageUrl}" alt="${title}">`;

        const language =
            !show.language || show.language.length < 1 ? "N/A" : show.language;

        let genres = "N/A";

        if (show.genres && show.genres.length > 0) {
            let liHtml = ``;

            for (const currentGenre of show.genres) {
                liHtml += `<li>${currentGenre}</li>`;
            }

            genres = `<ul>
                        ${liHtml}
                    </ul>`;
        }

        const averageRating =
            !show.rating ||
            Object.keys(show.rating).length < 1 ||
            !show.rating.average
                ? "N/A"
                : show.rating.average;

        const network =
            !show.network ||
            Object.keys(show.network).length < 1 ||
            !show.network.name
                ? "N/A"
                : show.network.name;

        const summary =
            !show.summary || show.summary.length < 1 ? "N/A" : show.summary;

        html += `<dl>
                    <dt>Language</dt>
                    <dd>${language}</dd>
                    <dt>Genres</dt>
                    <dd>${genres}</dd>
                    <dt>Average Rating</dt>
                    <dd>${averageRating}</dd>
                    <dt>Network</dt>
                    <dd>${network}</dd>
                    <dt>Summary</dt>
                    <dd>${summary}</dd>
                </dl>`;

        renderShow(html);
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

    function clearShowList() {
        $("#showList").html("");
    }

    function clearShow() {
        $("#show").html("");
    }

    function renderShow(html) {
        $("#show").html(html);
        $("#show").show();
    }

    function hideShowList() {
        clearShowList();
        $("#showList").hide();
    }

    function hideShow() {
        clearShow();
        $("#show").hide();
    }
})(jQuery);
