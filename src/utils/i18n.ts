// @ts-nocheck

import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        app: {
            main_settings: 'Main settings',
            stations: "Stations",
            configure: "Manage",
            export_file: 'Export',
            save_file: 'Save',
            import_file: 'Import',
            cursor: 'Cursor',
            about: 'About project'
        },
        newStation: {
            add_station: 'Add station',
        },
        stationsTable: {
            name: "Name",
            step: "Step",
            action: "Action",
            editStation: {
                title: "Configuration: Station",
                name: "Name",
                show: "Show",
                up: "Up",
                down: "Down",
                step: "Step",
                connectedStations: {
                    title: "Interchange Stations:",
                    add: "Add int. station",
                    name: "Name",
                    number: "Line number",
                    color: "Color",
                    delete: "Remove int. station"
                },
                delete: "Remove station",
                close: "Close"
            }
        },
        baseSettings: {
            width: "Scheme width",
            height: "Scheme height",
            line: "Line",
            configure: "Configuration",
            configModal: {
                name: "Name",
                number: "Number",
                color: "Color",
                close: "Close"
            }
        }
    },
    ru: {
        app: {
            main_settings: 'Основные настройки',
            stations: "Станции",
            configure: "Управления",
            export_file: 'Экспорт',
            save_file: 'Сохранить',
            import_file: 'Импорт',
            cursor: 'Курсор',
            about: 'О проекте'
        },
        newStation: {
            add_station: 'Добавить станцию',
        },
        stationsTable: {
            name: "Название",
            step: "Шаг",
            action: "Действие",
            editStation: {
                title: "Конфигурация: Новая Станция",
                name: "Название",
                show: "Отображение",
                up: "Сверху",
                down: "Снизу",
                step: "Шаг",
                connectedStations: {
                    title: "Связанные станции (переходы):",
                    add: "Добавить переход",
                    name: "Название",
                    number: "Номер линии",
                    color: "Цвет",
                    delete: "Удалить переход"
                },
                delete: "Удалить станцию",
                close: "Закрыть"
            }
        },
        baseSettings: {
            width: "Ширина схемы",
            height: "Высота схемы",
            line: "Линия",
            configure: "Конфигурация",
            configModal: {
                name: "Название",
                number: "Номер",
                color: "Цвет",
                close: "Закрыть"
            }
        }
    }
}

// 2. Create i18n instance with options
export const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'ru',
    messages
})
