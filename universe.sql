--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    has_life boolean,
    is_spherical boolean,
    age_in_millions_of_years numeric,
    test_column1 integer NOT NULL,
    test_column2 integer NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(255) NOT NULL,
    planet_id integer NOT NULL,
    distance_from_planet numeric,
    is_spherical boolean
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(255) NOT NULL,
    star_id integer NOT NULL,
    has_life boolean,
    is_spherical boolean,
    age_in_millions_of_years integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(255) NOT NULL,
    galaxy_id integer NOT NULL,
    distance_from_earth numeric,
    age_in_billions_of_years numeric
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: test; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.test (
    test_id integer NOT NULL,
    name character varying(255) NOT NULL,
    test_column integer NOT NULL
);


ALTER TABLE public.test OWNER TO freecodecamp;

--
-- Name: test_test_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.test_test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_test_id_seq OWNER TO freecodecamp;

--
-- Name: test_test_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.test_test_id_seq OWNED BY public.test.test_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Name: test test_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.test ALTER COLUMN test_id SET DEFAULT nextval('public.test_test_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 'Our home galaxy, a barred spiral galaxy.', true, true, 13000, 1, 100);
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 'The nearest major galaxy to the Milky Way.', true, true, 10000, 2, 200);
INSERT INTO public.galaxy VALUES (3, 'Triangulum', 'A spiral galaxy located approximately 3 million light-years from the Milky Way.', true, true, 12000, 3, 300);
INSERT INTO public.galaxy VALUES (4, 'Whirlpool', 'A famous spiral galaxy known for its interaction with a smaller galaxy.', true, true, 7000, 4, 400);
INSERT INTO public.galaxy VALUES (5, 'Pinwheel', 'A face-on spiral galaxy that is a member of the Canes Venatici I Group.', true, true, 8500, 5, 500);
INSERT INTO public.galaxy VALUES (6, 'Cartwheel', 'A peculiar galaxy with a strikingly beautiful appearance.', true, true, 6000, 6, 600);
INSERT INTO public.galaxy VALUES (7, 'Seyfert', 'A galaxy with an extremely bright nucleus, indicative of an active galactic nucleus.', true, true, 9000, 7, 700);
INSERT INTO public.galaxy VALUES (8, 'Elliptical', 'A galaxy with a roughly ellipsoidal shape and minimal star formation.', false, true, 11000, 8, 800);
INSERT INTO public.galaxy VALUES (9, 'Spiral', 'A galaxy with a flat, rotating disk containing spiral arms.', true, true, 9500, 9, 900);
INSERT INTO public.galaxy VALUES (10, 'Irregular', 'A galaxy that does not fit into the other categories, with no clear shape.', false, false, 5000, 10, 1000);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Phobos', 1, 9370, true);
INSERT INTO public.moon VALUES (2, 'Deimos', 1, 23450, true);
INSERT INTO public.moon VALUES (3, 'Io', 2, 421700, true);
INSERT INTO public.moon VALUES (4, 'Europa', 2, 671000, true);
INSERT INTO public.moon VALUES (5, 'Ganymede', 2, 1070400, true);
INSERT INTO public.moon VALUES (6, 'Callisto', 2, 1882700, true);
INSERT INTO public.moon VALUES (7, 'Titan', 3, 1180000, true);
INSERT INTO public.moon VALUES (8, 'Rhea', 3, 5271000, true);
INSERT INTO public.moon VALUES (9, 'Tethys', 3, 2946000, true);
INSERT INTO public.moon VALUES (10, 'Dione', 3, 3771000, true);
INSERT INTO public.moon VALUES (11, 'Mimas', 3, 1855000, true);
INSERT INTO public.moon VALUES (12, 'Enceladus', 3, 2383000, true);
INSERT INTO public.moon VALUES (13, 'Triton', 4, 3540000, true);
INSERT INTO public.moon VALUES (14, 'Charon', 4, 35760000, true);
INSERT INTO public.moon VALUES (15, 'Titania', 5, 436300, true);
INSERT INTO public.moon VALUES (16, 'Oberon', 5, 583500, true);
INSERT INTO public.moon VALUES (17, 'Miranda', 5, 129900, true);
INSERT INTO public.moon VALUES (18, 'Ariel', 5, 191000, true);
INSERT INTO public.moon VALUES (19, 'Umbriel', 5, 266000, true);
INSERT INTO public.moon VALUES (20, 'Proteus', 6, 3177000, true);
INSERT INTO public.moon VALUES (21, 'Naiad', 6, 48000, true);
INSERT INTO public.moon VALUES (22, 'Thalassa', 6, 50000, true);
INSERT INTO public.moon VALUES (23, 'Despina', 6, 52500, true);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 1, false, true, 4600);
INSERT INTO public.planet VALUES (2, 'Venus', 1, false, true, 4200);
INSERT INTO public.planet VALUES (3, 'Earth', 1, true, true, 4500);
INSERT INTO public.planet VALUES (4, 'Mars', 1, false, true, 4300);
INSERT INTO public.planet VALUES (5, 'Jupiter', 2, false, true, 6100);
INSERT INTO public.planet VALUES (6, 'Saturn', 2, false, true, 4500);
INSERT INTO public.planet VALUES (7, 'Uranus', 3, false, true, 4300);
INSERT INTO public.planet VALUES (8, 'Neptune', 3, false, true, 3800);
INSERT INTO public.planet VALUES (9, 'Proxima b', 10, false, true, 5000);
INSERT INTO public.planet VALUES (10, 'Kepler-22b', 4, false, true, 2000);
INSERT INTO public.planet VALUES (11, 'HD 40307 g', 5, false, true, 3200);
INSERT INTO public.planet VALUES (12, 'Tau Ceti e', 6, false, true, 5000);
INSERT INTO public.planet VALUES (13, 'Gliese 163 c', 7, false, true, 4700);
INSERT INTO public.planet VALUES (14, 'Wolf 1061 c', 8, false, true, 4900);
INSERT INTO public.planet VALUES (15, 'Trappist-1e', 9, false, true, 500);
INSERT INTO public.planet VALUES (16, 'Teegarden b', 9, false, true, 4800);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Rigel', 1, 860, 10);
INSERT INTO public.star VALUES (2, 'Betelgeuse', 1, 640, 8);
INSERT INTO public.star VALUES (3, 'Vega', 2, 25, 4.5);
INSERT INTO public.star VALUES (4, 'Sirius', 3, 8.6, 2.4);
INSERT INTO public.star VALUES (5, 'Canopus', 4, 310, 5);
INSERT INTO public.star VALUES (6, 'Altair', 5, 16.7, 7);
INSERT INTO public.star VALUES (7, 'Antares', 6, 550, 10);
INSERT INTO public.star VALUES (8, 'Fomalhaut', 7, 25, 4.3);
INSERT INTO public.star VALUES (9, 'Proxima Centauri', 8, 4.24, 4.85);
INSERT INTO public.star VALUES (10, 'Barnard Star', 9, 5.96, 9);


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.test VALUES (1, 'Test1', 100);
INSERT INTO public.test VALUES (2, 'Test2', 200);
INSERT INTO public.test VALUES (3, 'Test3', 300);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 10, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 23, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 16, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 10, true);


--
-- Name: test_test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.test_test_id_seq', 3, true);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: test test_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_name_key UNIQUE (name);


--
-- Name: test test_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (test_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

