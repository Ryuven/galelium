# 🏢 Galelium — Corporate Infrastructure

Главный репозиторий экосистемы **Galelium** — внутренней инфраструктуры корпорации с модульной архитектурой.

---

## 📚 Экосистема сервисов

```
┌─────────────────────────────────────────────────────────────┐
│                   🌐 galelium.com (Main)                    │
│              Главный сайт корпорации и портал               │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
    👨‍💼 ADMIN          📦 DELIVERY          👷 WORKER
 admin.galelium    delivery.galelium    worker.galelium
        ↓                     ↓
   ┌────┴────┐           ┌────┴────┐
   ↓         ↓           ↓         ↓
 ADMIN      COURIER    PULSAR     LIBERTY
admin.      courier.    pulsar.    liberty.
delivery.   delivery.   galelium   galelium
galelium    galelium

🔥 Firebase (Auth, DB, Storage) — общий для всех
```

---

## 🗂️ Полный реестр сервисов

### 🌍 Основной портал
| Сервис | Домен | Назначение | Статус |
|--------|-------|-----------|--------|
| **Main Site** | `galelium.com` | Главный корпоративный сайт | ✅ Active |

### 🛠️ Административные панели
| Сервис | Домен | Назначение | Статус |
|--------|-------|-----------|--------|
| **Admin Panel** | `admin.galelium.com` | Главная админ-панель | ✅ Active |
| **Delivery Admin** | `admin.delivery.galelium.com` | Управление доставками | ✅ Active |

### 📦 Модули доставки
| Сервис | Домен | Назначение | Статус |
|--------|-------|-----------|--------|
| **Delivery Service** | `delivery.galelium.com` | Основной сервис доставки | ✅ Active |
| **Courier Panel** | `courier.delivery.galelium.com` | Панель для курьеров | ✅ Active |

### 👥 Внутренние портали
| Сервис | Домен | Назначение | Статус |
|--------|-------|-----------|--------|
| **Worker Portal** | `worker.galelium.com` | Портал сотрудников | ✅ Active |

### 📡 Дополнительные проекты
| Сервис | Домен | Назначение | Статус |
|--------|-------|-----------|--------|
| **Pulsar Module** | `pulsar.galelium.com` | Модуль Pulsar | ✅ Active |
| **Liberty Project** | `liberty.galelium.com` | Проект Liberty | ✅ Active |

### 🔌 Backend (Configuration)
| Сервис | Домен | Назначение | Статус |
|--------|-------|-----------|--------|
| **API Config** | `api.galelium.com` | Конфиги Firebase и интеграции | ✅ Reference |

---

## 🔥 Firebase Integration

Все сервисы подключены к **Firebase**:

```
📱 Web Apps (HTML/JS)
    ↓
🔥 Firebase
    ├─ Authentication (Auth)
    ├─ Realtime Database / Firestore (DB)
    ├─ Cloud Storage (Files)
    └─ Cloud Functions (если нужны)
```

### Firebase проект
- **Project ID**: Смотри в каждом сервисе (обычно в `index.html` или конфиг-файле)
- **Config**: Хранится в коде каждого сервиса

---

## 📖 Документация по сервисам

### 🏠 [galelium](https://github.com/Ryuven/galelium)
Главный корпоративный сайт.
- **Tech**: HTML/CSS/JS
- **Database**: Firebase Realtime DB
- **GitHub Pages**: ✅ Enabled
- **Auto-deploy**: При push в `main`

### 👨‍💼 [admin.galelium](https://github.com/Ryuven/admin.galelium)
Главная админ-панель для управления корпоративными данными.
- **Tech**: HTML/CSS/JS
- **Database**: Firebase
- **GitHub Pages**: ✅ Enabled
- **Доступ**: Только администраторы

### 📦 [delivery.galelium](https://github.com/Ryuven/delivery.galelium)
Основной сервис управления доставками.
- **Tech**: HTML/CSS/JS
- **Database**: Firebase Firestore
- **GitHub Pages**: ✅ Enabled
- **Подсервисы**: 
  - `admin.delivery.galelium` — управление доставками
  - `courier.delivery.galelium` — панель курьеров

### 📮 [admin.delivery.galelium](https://github.com/Ryuven/admin.delivery.galelium)
Админ-панель для управления доставками и курьерами.
- **Tech**: HTML/CSS/JS
- **Database**: Firebase
- **GitHub Pages**: ✅ Enabled
- **Функции**: Создание/редактирование заказов, назначение курьеров

### 🚗 [courier.delivery.galelium](https://github.com/Ryuven/courier.delivery.galelium)
Панель для курьеров (отслеживание, маршруты, статусы доставок).
- **Tech**: HTML/CSS/JS
- **Database**: Firebase (real-time updates)
- **GitHub Pages**: ✅ Enabled
- **Функции**: Список доставок, навигация, изменение статуса

### 👷 [worker.galelium](https://github.com/Ryuven/worker.galelium)
Внутренний портал для сотрудников (профили, документы, расписание).
- **Tech**: HTML/CSS/JS
- **Database**: Firebase
- **GitHub Pages**: ✅ Enabled
- **Доступ**: Только сотрудники (auth через Firebase)

### ⚡ [pulsar.galelium](https://github.com/Ryuven/pulsar.galelium)
Специализированный модуль Pulsar.
- **Tech**: HTML/CSS/JS
- **Database**: Firebase
- **GitHub Pages**: ✅ Enabled

### 🗽 [liberty.galelium](https://github.com/Ryuven/liberty.galelium)
Новый проект Liberty (в разработке).
- **Tech**: HTML/CSS/JS
- **Database**: Firebase
- **GitHub Pages**: ✅ Enabled
- **Статус**: 🆕 Только создан

### 🔧 [api.galelium](https://github.com/Ryuven/api.galelium)
Репозиторий конфигураций и интеграций Firebase.
- **Tech**: JavaScript (конфиги, вспомогательные скрипты)
- **Назначение**: Firebase config, environment variables, утилиты
- **GitHub Pages**: ❌ (Reference only)

---

## 🚀 Быстрый старт

### Локальное развёртывание

```bash
# 1. Клонируем нужный репо
git clone https://github.com/Ryuven/[service].galelium.git
cd [service].galelium

# 2. Открываем в браузере
# Простой способ: просто откройте index.html в браузере
# Или используйте Live Server (VS Code extension)

# 3. Проверяем Firebase подключение
# Откроешь браузер → Console (F12) → проверяешь подключение
```

### Развёртывание сабдоменов

Каждый сервис развёрнут как отдельный репозиторий на GitHub Pages:

```bash
# 1. Клонируешь репо
git clone https://github.com/Ryuven/[service].galelium.git

# 2. Делаешь изменения
# Редактируешь HTML/CSS/JS

# 3. Коммитишь и пушишь
git add .
git commit -m "feat: описание"
git push origin main

# → Автоматический deploy на [service].galelium.com
```

---

## 📋 Чеклист для новых членов команды

- [ ] Доступ к GitHub аккаунту
- [ ] Клонирование репозиториев, с которыми работаешь
- [ ] Доступ к Firebase проекту (у Ryuven)
- [ ] Локальное тестирование в браузере
- [ ] Понимание, как работает GitHub Pages deploy
- [ ] Запись паролей и доступов (безопасно)

---

## 🔐 GitHub Pages настройки

Все сервисы используют GitHub Pages для автоматического развёртывания:

- **CNAME file**: Настроен для маршрутизации на поддомен
- **Default branch**: `main`
- **Auto-deploy**: Активно (при push → автодеплой на домен)

Проверить статус:
```
Repo Settings → Pages → Deploy from branch (main)
```

---

## 🛠️ Разработка и deploy

### Workflow
1. Создаёшь **feature branch** 
   ```bash
   git checkout -b feature/new-feature
   ```
2. Делаешь изменения в коде
3. Коммитишь 
   ```bash
   git commit -m "feat: описание"
   ```
4. Пушишь в репо 
   ```bash
   git push origin feature/new-feature
   ```
5. На GitHub создаёшь **Pull Request** на `main`
6. После merge → автоматический deploy на домен

### Локальная разработка
```bash
# Для всех сервисов (HTML/JS)
cd [service].galelium

# Способ 1: Открыть файл в браузере
open index.html

# Способ 2: Live Server (VS Code)
# Установи расширение Live Server
# Нажми "Go Live" в статус-баре

# Способ 3: Python server
python -m http.server 8000
# Откройся на http://localhost:8000
```

---

## 📞 Контакты и ответственность

| Сервис | Ответственный | 
|--------|---------------|
| Вся экосистема | @Ryuven |
| Firebase конфиги | @Ryuven |
| Доступы и окружение | @Ryuven |

---

## 🚨 Важное

- ⚠️ **Не push-ить Firebase credentials** в репо
- ⚠️ **Не merge в main без тестирования** локально
- ⚠️ **Всегда work из отдельных веток** (feature/...)
- ✅ **Используй .gitignore** для конфигов и keys
- ✅ **После push проверь deploy** на соответствующем домене

---

## 📝 Примеры команд

```bash
# Клонирование конкретного сервиса
git clone https://github.com/Ryuven/delivery.galelium.git

# Обновление репо
git pull origin main

# Создание feature branch
git checkout -b feature/new-dashboard

# Коммит
git commit -m "feat: add new dashboard widget"

# Push в feature branch
git push origin feature/new-dashboard

# На GitHub: Create Pull Request на main
# После одобрения → merge → автодеплой
```

---

## 🔗 Ссылки на все репозитории

- [galelium](https://github.com/Ryuven/galelium) — главный сайт
- [admin.galelium](https://github.com/Ryuven/admin.galelium) — админ-панель
- [delivery.galelium](https://github.com/Ryuven/delivery.galelium) — доставки
- [admin.delivery.galelium](https://github.com/Ryuven/admin.delivery.galelium) — админ доставок
- [courier.delivery.galelium](https://github.com/Ryuven/courier.delivery.galelium) — курьеры
- [worker.galelium](https://github.com/Ryuven/worker.galelium) — портал сотрудников
- [pulsar.galelium](https://github.com/Ryuven/pulsar.galelium) — модуль Pulsar
- [liberty.galelium](https://github.com/Ryuven/liberty.galelium) — проект Liberty
- [api.galelium](https://github.com/Ryuven/api.galelium) — конфиги и утилиты

---

**Последнее обновление**: 09 июня 2026  
**Версия экосистемы**: 1.0  
**Для внутреннего использования**
