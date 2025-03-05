from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.deps import get_current_active_user
from app.core.database import get_db
from app.models.user import User
from app.models.conversation import Conversation, Message
from app.schemas.conversation import Conversation as ConversationSchema
from app.schemas.conversation import ConversationCreate, Message as MessageSchema

router = APIRouter()

@router.get("/", response_model=List[ConversationSchema])
def read_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve conversations.
    """
    conversations = db.query(Conversation).filter(
        Conversation.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return conversations

@router.post("/", response_model=ConversationSchema)
def create_conversation(
    *,
    db: Session = Depends(get_db),
    conversation_in: ConversationCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new conversation.
    """
    conversation = Conversation(
        **conversation_in.dict(),
        user_id=current_user.id
    )
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    return conversation

@router.get("/{conversation_id}", response_model=ConversationSchema)
def read_conversation(
    *,
    db: Session = Depends(get_db),
    conversation_id: int,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get conversation by ID.
    """
    conversation = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id
    ).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation

@router.post("/{conversation_id}/messages", response_model=MessageSchema)
def create_message(
    *,
    db: Session = Depends(get_db),
    conversation_id: int,
    message_in: MessageSchema,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new message in conversation.
    """
    conversation = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id
    ).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    message = Message(
        **message_in.dict(),
        conversation_id=conversation_id
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message 