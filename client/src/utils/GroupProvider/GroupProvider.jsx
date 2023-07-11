import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const GroupContext = createContext()

export const GroupProvider = ({ children }) => {
    const [groupId, setGroupId] = useState("")
    const [title, setTitle] = useState("")
    const [dateheure, setDateheure] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [admin, setAdmin] = useState("")
    const [nbmembers, setNbmembers] = useState("")
    const [membersIdList, setMembersIdList] = useState("")

    const updateGroupeData = (data) => {
        //console.log("Data GroupProvider :", data);
        setGroupId(data.id)
        setTitle(data.title)
        setDateheure(data.dateheure)
        setDescription(data.description)
        setImage(data.image)
        setAdmin(data.admin)
        setNbmembers(data.nbmembers)
        setMembersIdList(data.membersidlist)
    }

    return (
        <GroupContext.Provider value={{ 
            groupId, setGroupId,
            title, setTitle,
            dateheure, setDateheure,
            description, setDescription,
            image, setImage,
            admin, setAdmin,
            nbmembers, setNbmembers,
            membersIdList, setMembersIdList,
            updateGroupeData,
        }}>
            {children}
        </GroupContext.Provider>
    )
}

GroupProvider.propTypes = {
    groupId: PropTypes.number,
    title: PropTypes.string,
    dateheure: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    admin: PropTypes.string,
    nbmembers: PropTypes.number,
    membersIdList: PropTypes.arrayOf(PropTypes.number),
    updateGroupeData: PropTypes.func,
}