package main

import (
	"context"
	"database/sql"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/mattn/go-sqlite3"
)

var DB_PATH string
var API_URL_PREFIX string = "/api"

func init() {
	// outside of docker
	if fileExists("../data/tech-test.db") {
		DB_PATH = "../data/tech-test.db"
	}

	// inside docker
	if fileExists("/data/tech-test.db") {
		DB_PATH = "/data/tech-test.db"
	}

	if DB_PATH == "" {
		log.Fatal("Unable to locate db file for docker or local setup")
	}
}

func fileExists(filename string) bool {
	info, err := os.Stat(filename)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}

type Controller struct {
	db *sql.DB
}

func NewController() (*Controller, error) {
	db, err := sql.Open("sqlite3", DB_PATH)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	err = db.PingContext(ctx)
	return &Controller{db}, err
}

func (crtl *Controller) Ping(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	err := crtl.db.PingContext(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "unhealthy"})
	}
	return c.JSON(http.StatusOK, map[string]string{"message": "healthy"})
}

type Album struct {
	AlbumName   string `json:"album_name"`
	ReleaseYear int    `json:"release_year"`
	ArtistName  string `json:"artist_name"`
	Genre       string `json:"genre"`
}

func (crtl *Controller) GetAlbums(c echo.Context) error {

	albums := make([]Album, 0)

	rows, err := crtl.db.Query(`
		SELECT 
			alb.name album_name,
			alb.release_year,
			art.name artist_name,
			gen.name genre
		FROM album alb
		INNER JOIN artist art ON art.id = alb.artist_id
		INNER JOIN genre gen ON gen.id = alb.genre_id
		ORDER BY artist_name, release_year, album_name, genre;
	`)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	for rows.Next() {
		var album Album
		err = rows.Scan(&album.AlbumName, &album.ReleaseYear, &album.ArtistName, &album.Genre)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err.Error())
		}
		albums = append(albums, album)
	}

	return c.JSON(http.StatusOK, albums)
}

func main() {

	crtl, err := NewController()
	if err != nil {
		log.Fatal(err)
	}

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
		AllowOrigins:     []string{"*"},
	}))

	e.GET(API_URL_PREFIX+"/ping", crtl.Ping)
	e.GET(API_URL_PREFIX+"/albums", crtl.GetAlbums)

	e.Logger.Fatal(e.Start(":5000"))
}
