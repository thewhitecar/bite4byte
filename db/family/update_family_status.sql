update family 
set picked_up = TRUE, last_pickup_date = CURRENT_DATE
where id = ${familyId};