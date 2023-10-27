import * as React from 'react'

function SingleNews({ match, newsData }) {
    const { title } = match.params;
    const article = newsData.find((article) => article.title === title);

    if (!article) {
        return <div>News not found.</div>;
    }

    return (
        <div>
            <h1>{article.title}</h1>
            <img src={article.image} alt={article.title} />
            <p>{article.description}</p>
            <p>Source: {article.source.name}</p>
            {/* Add more details as needed */}
        </div>
    );
}

export default SingleNews