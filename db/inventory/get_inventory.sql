select i.id as item_idP,
ip.id as item_pantry_link_idP,
i.item_name,
ip.quantity from item i 
join item_pantry_link ip 
on i.id = ip.item_id
where ip.pantry_id = ${id}