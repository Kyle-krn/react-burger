const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
  
    const addLeadingZero = (num: number): string => (num < 10 ? `0${num}` : num.toString());
  
    // Проверяем, является ли день текущим
    const isToday = date.getDate() === now.getDate() &&
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear();
  
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    if (isToday) {
      return `Сегодня, ${hours}:${minutes}`;
    }
  
    // Массив названий месяцев на русском языке
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
  
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${day} ${month}, ${hours}:${minutes}`;
  };

export default formatDate;