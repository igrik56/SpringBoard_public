def weekday_name(day_of_week):
    """Return name of weekday.
    
        >>> weekday_name(1)
        'Sunday'
        
        >>> weekday_name(7)
        'Saturday'
        
    For days not between 1 and 7, return None
    
        >>> weekday_name(9)
        >>> weekday_name(0)
    """
    week_list = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return week_list[day_of_week-1] if day_of_week >= 1 and day_of_week <= 7 else 'None'


d = -2
while d <=9:
    print(f'{weekday_name(d)} = {d} day')
    d+=1