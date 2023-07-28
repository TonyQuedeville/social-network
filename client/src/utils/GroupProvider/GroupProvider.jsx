/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	GroupProvider : Contexte groupe de discution
*/

import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const GroupContext = createContext()

export const GroupProvider = ({ children }) => {
    const [groupId, setGroupId] = useState("")
    const [title, setTitle] = useState("")
    const [createDate, setCreateDate] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [admin, setAdmin] = useState("")
    const [nbMembers, setNbMembers] = useState("")
    const [members, setMembers] = useState("")

    const updateGroupeData = (data) => {
        //console.log("Data GroupProvider :", data);
        setGroupId(data.id)
        setTitle(data.title)
        setCreateDate(data.create_date)
        setDescription(data.description)
        setImage(data.image)
        setAdmin(data.admin)
        setNbMembers(data.nb_members)
        setMembers(data.groups_members)
    }

    return (
        <GroupContext.Provider value={{ 
            groupId, setGroupId,
            title, setTitle,
            createDate, setCreateDate,
            description, setDescription,
            image, setImage,
            admin, setAdmin,
            nbMembers, setNbMembers,
            members, setMembers,
            updateGroupeData,
        }}>
            {children}
        </GroupContext.Provider>
    )
}

GroupProvider.propTypes = {
    groupId: PropTypes.number,
    title: PropTypes.string,
    createDate: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    admin: PropTypes.string,
    nbMembers: PropTypes.number,
    members: PropTypes.arrayOf(PropTypes.object),
    updateGroupeData: PropTypes.func,
}