import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSend, FiCheckCircle, FiStar } from 'react-icons/fi';

const PageWrapper = styled.div`
  padding-top: 0;
  min-height: 100vh;
  background: var(--global-primary-bg);
`;

const PageInner = styled.div`
  max-width: 38rem;
  margin: 0 auto;
  padding: 0.5rem 1.5rem 2.5rem;

  @media (max-width: 600px) {
    padding: 0.25rem 1rem 1.5rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--global-text-muted);
  text-decoration: none;
  transition: color 0.15s ease;
  margin-bottom: 0.5rem;
  width: fit-content;

  &:hover {
    color: var(--global-text);
  }
`;

const PageTitle = styled.h1`
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800;
  color: var(--global-text);
  letter-spacing: -0.035em;
  margin: 0 0 0.4rem;
`;

const PageSubtitle = styled.p`
  font-size: 0.88rem;
  color: var(--global-text-muted);
  margin: 0;
  line-height: 1.6;
`;

const FormCard = styled.form`
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.5rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 4px 20px var(--global-card-shadow);
  animation: fadeIn 0.35s ease;

  @media (max-width: 600px) {
    padding: 1.25rem;
    gap: 1.25rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const FormLabel = styled.label`
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--global-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.07em;
`;

const PillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const CategoryPill = styled.button<{ $active: boolean }>`
  padding: 0.45rem 0.9rem;
  font-size: 0.78rem;
  font-weight: 600;
  border-radius: 2rem;
  border: 1px solid ${({ $active }) => ($active ? 'var(--global-text-muted)' : 'var(--global-border)')};
  background: ${({ $active }) => ($active ? 'var(--global-secondary-bg)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--global-text)' : 'var(--global-text-muted)')};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--global-text-muted);
    background: var(--global-secondary-bg);
    color: var(--global-text);
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: 0.35rem;
  border: 1px solid var(--global-border);
  background: var(--global-primary-bg);
  color: var(--global-text);
  font-size: 0.88rem;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  transition: all 0.15s ease;

  &:focus {
    border-color: var(--primary-accent);
    box-shadow: 0 0 0 2px rgba(128, 128, 207, 0.15);
  }

  &::placeholder {
    color: var(--global-text-muted);
    opacity: 0.6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 0.85rem;
  border-radius: 0.35rem;
  border: 1px solid var(--global-border);
  background: var(--global-primary-bg);
  color: var(--global-text);
  font-size: 0.88rem;
  font-family: inherit;
  outline: none;
  resize: vertical;
  min-height: 8rem;
  box-sizing: border-box;
  transition: all 0.15s ease;

  &:focus {
    border-color: var(--primary-accent);
    box-shadow: 0 0 0 2px rgba(128, 128, 207, 0.15);
  }

  &::placeholder {
    color: var(--global-text-muted);
    opacity: 0.6;
  }
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const StarButton = styled.button<{ $filled: boolean; $hovered: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $filled, $hovered }) =>
    $filled || $hovered ? '#ffd700' : 'var(--global-text-muted)'};
  transition: color 0.15s ease, transform 0.1s ease;
  opacity: ${({ $filled, $hovered }) => ($filled || $hovered ? 1 : 0.4)};

  &:hover {
    transform: scale(1.15);
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.35rem;
  background: var(--global-text);
  color: var(--global-primary-bg);
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s ease;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.88;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessCard = styled.div`
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.5rem;
  padding: 2.5rem 1.75rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 20px var(--global-card-shadow);
  animation: scaleUp 0.3s ease;
`;

const SuccessIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #39cf80;
  background: rgba(57, 207, 128, 0.1);
  padding: 1.25rem;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const SuccessTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--global-text);
  margin: 0;
  letter-spacing: -0.02em;
`;

const SuccessText = styled.p`
  font-size: 0.88rem;
  color: var(--global-text-muted);
  line-height: 1.6;
  margin: 0;
  max-width: 24rem;
`;

const SecondaryActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 1.2rem;
  border-radius: 0.35rem;
  background: transparent;
  color: var(--global-text-muted);
  font-size: 0.82rem;
  font-weight: 600;
  border: 1px solid var(--global-border);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--global-secondary-bg);
    color: var(--global-text);
    border-color: var(--global-text-muted);
  }
`;

const DashboardBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 1.2rem;
  border-radius: 0.35rem;
  background: var(--global-text);
  color: var(--global-primary-bg);
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.85;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
`;

type Category = 'BUG' | 'SUGGESTION' | 'IMPROVEMENT' | 'GENERAL';

export function FeedbackPage() {
  const [category, setCategory] = useState<Category>('BUG');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [email, setEmail] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setSubmitting(true);
    // Simulate real feedback submission latency
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleResetForm = () => {
    setCategory('BUG');
    setSubject('');
    setMessage('');
    setRating(0);
    setEmail('');
    setSubmitted(false);
  };

  return (
    <PageWrapper id="feedback-page-wrapper">
      <PageInner id="feedback-page-inner">
        <PageHeader id="feedback-page-header">
          <BackLink to="/" id="back-to-dashboard-link">
            <FiArrowLeft size={12} /> Back to Dashboard
          </BackLink>
          <PageTitle id="feedback-page-title">Provide Feedback</PageTitle>
          <PageSubtitle id="feedback-page-subtitle">
            Help us improve GachaTracker. Report bugs, suggest new gacha titles, or request features you want to see.
          </PageSubtitle>
        </PageHeader>

        {submitted ? (
          <SuccessCard id="feedback-success-card">
            <SuccessIconWrapper id="feedback-success-icon-wrapper">
              <FiCheckCircle size={40} />
            </SuccessIconWrapper>
            <SuccessTitle id="feedback-success-title">Feedback Submitted!</SuccessTitle>
            <SuccessText id="feedback-success-text">
              Thank you for sharing your thoughts with us! We read all of our community's input to consistently polish and improve GachaTracker.
            </SuccessText>
            <ButtonRow id="feedback-success-actions">
              <SecondaryActionBtn id="submit-more-feedback-btn" onClick={handleResetForm}>
                Submit Another Response
              </SecondaryActionBtn>
              <DashboardBtn to="/" id="return-to-dashboard-btn">
                Return to Dashboard
              </DashboardBtn>
            </ButtonRow>
          </SuccessCard>
        ) : (
          <FormCard id="feedback-form" onSubmit={handleSubmit}>
            <FormGroup id="group-category">
              <FormLabel id="label-category">Category</FormLabel>
              <PillGroup id="category-pills">
                {(['BUG', 'SUGGESTION', 'IMPROVEMENT', 'GENERAL'] as Category[]).map((cat) => (
                  <CategoryPill
                    id={`pill-category-${cat.toLowerCase()}`}
                    key={cat}
                    type="button"
                    $active={category === cat}
                    onClick={() => setCategory(cat)}
                  >
                    {cat.replace('_', ' ')}
                  </CategoryPill>
                ))}
              </PillGroup>
            </FormGroup>

            <FormGroup id="group-subject">
              <FormLabel id="label-subject" htmlFor="feedback-subject">
                Subject
              </FormLabel>
              <TextInput
                id="feedback-subject"
                type="text"
                placeholder="Briefly summarize your feedback..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup id="group-message">
              <FormLabel id="label-message" htmlFor="feedback-message">
                Description
              </FormLabel>
              <TextArea
                id="feedback-message"
                placeholder="Give us details or steps to reproduce if reporting a bug, or detail your design suggestions..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup id="group-rating">
              <FormLabel id="label-rating">Optional Rating</FormLabel>
              <RatingRow id="feedback-rating-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarButton
                    id={`feedback-star-${star}`}
                    key={star}
                    type="button"
                    $filled={star <= rating}
                    $hovered={star <= hoveredRating}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <FiStar size={20} fill={star <= rating || star <= hoveredRating ? '#ffd700' : 'none'} />
                  </StarButton>
                ))}
              </RatingRow>
            </FormGroup>

            <FormGroup id="group-email">
              <FormLabel id="label-email" htmlFor="feedback-email">
                Contact Email (Optional)
              </FormLabel>
              <TextInput
                id="feedback-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <SubmitButton
              id="feedback-submit-btn"
              type="submit"
              disabled={submitting || !subject.trim() || !message.trim()}
            >
              <FiSend size={13} />
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </SubmitButton>
          </FormCard>
        )}
      </PageInner>
    </PageWrapper>
  );
}
