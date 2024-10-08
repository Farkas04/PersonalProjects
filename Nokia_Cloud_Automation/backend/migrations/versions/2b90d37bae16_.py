"""empty message

Revision ID: 2b90d37bae16
Revises: a17f1f6b7453
Create Date: 2024-06-02 19:33:49.305137

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2b90d37bae16'
down_revision = 'a17f1f6b7453'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('vmtable', schema=None) as batch_op:
        batch_op.create_unique_constraint('unique_vm_attributes', ['name', 'topology', 'VM1', 'M_Plane'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('vmtable', schema=None) as batch_op:
        batch_op.drop_constraint('unique_vm_attributes', type_='unique')

    # ### end Alembic commands ###
