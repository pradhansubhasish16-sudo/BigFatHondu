# 👥 Friends Directory — Modular Architecture

Every person on this website has their own dedicated, completely self-contained folder inside `friends/`.

---

## 📁 Folder Structure

```text
friends/
├── aswini/                 # 🪙 Aswini Sahoo ("Assini")
│   ├── index.html          # Aswini's HTML page
│   ├── style.css           # Aswini's styling (emerald/gold, decibel visualizer, coin game)
│   ├── script.js           # Aswini's roasts, decibel meter, 1-paisa arcade game, calculator
│   └── images/             # Aswini's 6 photos
│
├── hondu/                  # 🍔 Sidhant "Hondu" (BigFatHondu)
│   ├── index.html          # Hondu's HTML page
│   ├── style.css           # Hondu's styling (gravity, chin alerts, food arcade)
│   ├── script.js           # Hondu's roasts, Feed Hondu game, aura poll, siren
│   └── images/             # Hondu's 9 photos
│
└── padhy/                  # ⚖️ Soumendra Padhy ("Lawyerpady")
    ├── index.html          # Padhy's HTML page
    ├── style.css           # Padhy's courtroom styling (legal blue/gold)
    ├── script.js           # Padhy's roasts & objection soundboard
    └── images/             # Padhy's 5 photos
```

---

## ➕ How To Add A New Friend in 3 Easy Steps

To add a new friend (for example, `rahul`):

### 1. Create a new folder:
```text
friends/rahul/
├── index.html
├── style.css
├── script.js
└── images/           <-- Place all their photos here
```

### 2. Connect the shared assets in `index.html`:
In `friends/rahul/index.html`:
```html
<link rel="stylesheet" href="../../shared/css/shared.css" />
<link rel="stylesheet" href="style.css" />

<!-- All images in the HTML point directly to their local images folder: -->
<img src="images/my_photo.jpg" />

<script src="../../shared/js/audio.js"></script>
<script src="script.js"></script>
```

### 3. Add a card to the Landing Hub (`index.html` at root):
Add a new character card inside `.character-grid` linking to `friends/rahul/index.html`.

The Node server will automatically recognize and serve `/friends/rahul/` or `/rahul` without needing configuration changes!
