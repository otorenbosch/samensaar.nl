# Sam en Saar Website

Website voor het kinderboek "Sam en Saar - Het geheim van de bronzen bijl".

## Ontwikkeld met Jekyll

Deze website is gebouwd met Jekyll, een statische site generator.

### Lokaal ontwikkelen

Om de site lokaal te draaien:

1. Installeer [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
2. Installeer Jekyll en Bundler:
   ```
   gem install jekyll bundler
   ```
3. Clone deze repository
4. Ga naar de projectmap en voer uit:
   ```
   bundle install
   bundle exec jekyll serve
   ```
5. Open je browser op `http://localhost:4000`

### Structuur

- `_includes/`: Herbruikbare componenten (header, footer)
- `_layouts/`: Paginasjablonen
- `_data/`: Gestructureerde gegevens (navigatie, boeken)
- `assets/`: CSS, afbeeldingen en andere statische bestanden

### Pagina's toevoegen

Om een nieuwe pagina toe te voegen:
1. Maak een nieuw `.html` of `.md` bestand in de hoofdmap
2. Voeg Jekyll front matter toe:
   ```
   ---
   layout: default
   title: Paginatitel
   ---
   ```
3. Voeg de inhoud toe

### Afbeeldingen

Afbeeldingen worden opgeslagen in `assets/images/` en kunnen worden gebruikt met:
```
![Alt tekst]({{ '/assets/images/bestandsnaam.jpg' | relative_url }})
```

## Contact

Voor vragen over de website: info@samensaar.nl