const request = require("supertest");
const app = require("../app");

describe("GET /quotes?q=love", () => {
  it("should return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "love" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("Check SQL injection drop tables", () => {
  it("should return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "love; DROP TABLE SpiritualQuotesSearch" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
      });

    //after that no entries in the table should have been dropped
    await request(app)
      .get("/quotes")
      .query({ q: "love" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("GET /quotes?q=", () => {
  it("should return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("GET /quotes?", () => {
  it("should return quotes", async () => {
    await request(app)
      .get("/quotes")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("GET /quotes?q=love&count=10", () => {
  it("should return 10 quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "love", count: 10 })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(10);
      });
  });
});

describe("GET /quotes?q=love&offset=1", () => {
  it("should return 10 quotes", async () => {
    let firstQuote = null;
    await request(app)
      .get("/quotes")
      .query({ q: "love", count: 1, offset: 1 })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        firstQuote = res.body[0].quote;
      });

    let secondQuote = null;
    await request(app)
      .get("/quotes")
      .query({ q: "love", count: 1, offset: 2 })
      .then((res2) => {
        expect(res2.status).toBe(200);
        expect(Array.isArray(res2.body)).toBe(true);
        expect(res2.body.length).toBe(1);
        secondQuote = res2.body[0].quote;
      });

    expect(firstQuote).not.toEqual(secondQuote);
  });
});

describe("GET /quotes?q=love&authors=", () => {
  it("should not return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "love", authors: "" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.text).toBe("[]");
      });
  });
});

describe("GET /quotes?q=love&authors=Nisargadatta Maharaj", () => {
  it("should return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "love", authors: "Nisargadatta Maharaj" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("GET /quotes?q=love&authors={many authors}", () => {
  it("should return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "love", authors: "Nisargadatta Maharaj,Muruganar,Sadhu Om" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("GET /quotes?q=love&sources=", () => {
  it("should not return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "love", sources: "" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.text).toBe("[]");
      });
  });
});

describe("GET /quotes?q=love&sources=The Seven Steps to Awakening", () => {
  it("should return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "love", sources: "The Seven Steps to Awakening" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("GET /quotes?q=love&random=false", () => {
  it("should return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "love", random: "false" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("GET /quotes?q=love&random=", () => {
  it("should return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "love", random: "" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("GET /quotes?q=love&random=invalidString", () => {
  it("should return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({ q: "love", random: "invalidString" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

//https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

describe("GET /quotes?q=love&random=true", () => {
  it("should return random quotes different from call to call", async () => {
    let firstCallQuotes = [];
    await request(app)
      .get("/quotes")
      .query({ q: "love", random: "true" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach((x) => firstCallQuotes.push(x.quote));
      });

    let secondCallQuotes = [];
    await request(app)
      .get("/quotes")
      .query({ q: "love", random: "true" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach((x) => secondCallQuotes.push(x.quote));
      });

    let didQuotesChanged = !arraysEqual(firstCallQuotes, secondCallQuotes);
    expect(didQuotesChanged).toBe(true);
  });
});

describe("GET /quotes? complete with all possible parameters", () => {
  it("should return quotes", async () => {
    await request(app)
      .get("/quotes")
      .query({
        q: "love",
        random: "false",
        sources: "The Seven Steps to Awakening",
        authors: "Nisargadatta Maharaj,Muruganar,Sadhu Om",
        count: 15,
        offset: 0,
      })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("GET /quotes?q=love%20devotion (search multiple keywords)", () => {
  it("should return less quotes than search with only one keyword", async () => {
    let nbrQuotesMultipleKeywords;
    await request(app)
      .get("/quotes")
      .query({ q: "love devotion" })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        nbrQuotesMultipleKeywords = res.body.length;
      });

    let nbrQuotesOneKeyword;
    await request(app)
      .get("/quotes")
      .query({ q: "love" })
      .then((res2) => {
        expect(res2.status).toBe(200);
        expect(Array.isArray(res2.body)).toBe(true);
        expect(res2.body.length).toBeGreaterThan(0);
        nbrQuotesOneKeyword = res2.body.length;
      });

    expect(nbrQuotesOneKeyword).toBeGreaterThan(nbrQuotesMultipleKeywords);
  });
});

describe("GET /quotes/daily", () => {
  it("should return same daily quote after 2 different calls of the same day", async () => {
    let firstQuote;
    await request(app)
      .get("/quotes/daily")
      .query({ q: "love devotion" })
      .then((res) => {
        expect(res.status).toBe(200);
        firstQuote = res.body;
      });

    await request(app)
      .get("/quotes/daily")
      .query({ q: "love" })
      .then((res2) => {
        expect(res2.status).toBe(200);
        expect(res2.body).toEqual(firstQuote);
      });
  });
});
